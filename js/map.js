/**
 * Map initialization and country highlighting functionality
 */

let map;
let geoJsonLayer;
let countryLayers = {};
let highlightedCountries = new Set();

// GeoJSON data URL (Natural Earth data via CDN)
const GEOJSON_URL = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';

/**
 * Initialize the Leaflet map
 */
function initMap() {
    // Create map centered on world view
    map = L.map('map', {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 8,
        worldCopyJump: true,
        maxBounds: [[-90, -180], [90, 180]],
        maxBoundsViscosity: 1.0
    });

    // Add tile layer (dark theme)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Load GeoJSON country boundaries
    loadCountryBoundaries();
}

/**
 * Load country boundaries from GeoJSON
 */
async function loadCountryBoundaries() {
    try {
        const response = await fetch(GEOJSON_URL);
        const data = await response.json();

        // Create GeoJSON layer with default styling
        geoJsonLayer = L.geoJSON(data, {
            style: defaultCountryStyle,
            onEachFeature: onEachCountry
        }).addTo(map);

        // Store reference to each country layer
        geoJsonLayer.eachLayer(layer => {
            const countryCode = layer.feature.properties['ISO3166-1-Alpha-2'];
            if (countryCode && countryCode !== '-99') {
                countryLayers[countryCode] = layer;
            }
        });

        console.log('Country boundaries loaded successfully');

        // Trigger initial update if app is ready
        if (typeof updateDisplay === 'function') {
            updateDisplay();
        }
    } catch (error) {
        console.error('Error loading country boundaries:', error);
    }
}

/**
 * Default styling for countries
 */
function defaultCountryStyle(feature) {
    return {
        fillColor: 'transparent',
        weight: 1,
        opacity: 0.3,
        color: '#4a5568',
        fillOpacity: 0
    };
}

/**
 * Style for highlighted conflict countries
 */
function highlightStyle(conflictCount) {
    return {
        fillColor: conflictCount > 1 ? '#9b2c2c' : '#e53e3e',
        weight: 2,
        opacity: 1,
        color: '#fc8181',
        fillOpacity: 0.6
    };
}

/**
 * Setup interactions for each country
 */
function onEachCountry(feature, layer) {
    layer.on({
        mouseover: highlightOnHover,
        mouseout: resetHighlightOnHover,
        click: onCountryClick
    });
}

/**
 * Highlight country on hover
 */
function highlightOnHover(e) {
    const layer = e.target;
    const countryCode = layer.feature.properties['ISO3166-1-Alpha-2'];

    if (highlightedCountries.has(countryCode)) {
        layer.setStyle({
            weight: 3,
            fillOpacity: 0.8
        });
    }

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

/**
 * Reset highlight on mouse out
 */
function resetHighlightOnHover(e) {
    const layer = e.target;
    const countryCode = layer.feature.properties['ISO3166-1-Alpha-2'];

    if (highlightedCountries.has(countryCode)) {
        const conflictCount = getConflictCountForCountry(countryCode);
        layer.setStyle(highlightStyle(conflictCount));
    } else {
        layer.setStyle(defaultCountryStyle(layer.feature));
    }
}

/**
 * Handle country click
 */
function onCountryClick(e) {
    const countryCode = e.target.feature.properties['ISO3166-1-Alpha-2'];
    const countryName = e.target.feature.properties.name;

    if (highlightedCountries.has(countryCode)) {
        showCountryConflicts(countryCode, countryName, e.latlng);
    }
}

/**
 * Update highlighted countries based on active conflicts
 * @param {Array} activeConflicts - Array of active conflict objects
 */
function updateHighlightedCountries(activeConflicts) {
    // Reset all previously highlighted countries
    highlightedCountries.forEach(code => {
        if (countryLayers[code]) {
            countryLayers[code].setStyle(defaultCountryStyle(countryLayers[code].feature));
        }
    });
    highlightedCountries.clear();

    // Build map of countries to conflict counts
    const countryConflictCounts = {};
    activeConflicts.forEach(conflict => {
        conflict.countries.forEach(code => {
            countryConflictCounts[code] = (countryConflictCounts[code] || 0) + 1;
        });
    });

    // Highlight new countries
    Object.keys(countryConflictCounts).forEach(code => {
        if (countryLayers[code]) {
            highlightedCountries.add(code);
            countryLayers[code].setStyle(highlightStyle(countryConflictCounts[code]));
            countryLayers[code].bringToFront();
        }
    });
}

/**
 * Get number of conflicts for a country
 * @param {string} countryCode - ISO country code
 * @returns {number} Number of active conflicts
 */
function getConflictCountForCountry(countryCode) {
    if (typeof getActiveConflicts !== 'function') return 0;

    const activeConflicts = getActiveConflicts();
    return activeConflicts.filter(c => c.countries.includes(countryCode)).length;
}

/**
 * Show popup with conflicts for a country
 * @param {string} countryCode - ISO country code
 * @param {string} countryName - Full country name
 * @param {L.LatLng} latlng - Click location
 */
function showCountryConflicts(countryCode, countryName, latlng) {
    if (typeof getActiveConflicts !== 'function') return;

    const activeConflicts = getActiveConflicts();
    const countryConflicts = activeConflicts.filter(c => c.countries.includes(countryCode));

    if (countryConflicts.length === 0) return;

    let popupContent = `<div class="popup-content">
        <h3>${countryName}</h3>
        <p>${countryConflicts.length} conflict${countryConflicts.length > 1 ? 's' : ''} in selected period</p>
        <div class="popup-conflicts-list">`;

    countryConflicts.forEach(conflict => {
        const startYear = new Date(conflict.startDate).getFullYear();
        const endYear = new Date(conflict.endDate).getFullYear();
        popupContent += `
            <div class="popup-conflict-item">
                <strong>${conflict.name}</strong><br>
                <small>${startYear} - ${endYear}</small>
            </div>`;
    });

    popupContent += `</div>
        <button class="view-details-btn" onclick="showConflictDetails('${countryConflicts[0].id}')">
            View Details
        </button>
    </div>`;

    L.popup()
        .setLatLng(latlng)
        .setContent(popupContent)
        .openOn(map);
}
