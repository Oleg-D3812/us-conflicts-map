/**
 * Main application logic
 * Handles timeline, filtering, and UI updates
 */

// Application state
let currentStartDate = new Date('1900-01-01');
let currentEndDate = new Date('2025-12-31');
let slider;

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initTimeline();
    initModal();
    updateDisplay();
});

/**
 * Initialize the timeline slider
 */
function initTimeline() {
    const sliderElement = document.getElementById('timeline-slider');

    // Create date range slider
    slider = noUiSlider.create(sliderElement, {
        start: [1900, 2025],
        connect: true,
        step: 1,
        range: {
            'min': 1900,
            'max': 2025
        },
        format: {
            to: value => Math.round(value),
            from: value => Math.round(value)
        }
    });

    // Update display when slider changes
    slider.on('update', (values) => {
        const startYear = parseInt(values[0]);
        const endYear = parseInt(values[1]);

        currentStartDate = new Date(`${startYear}-01-01`);
        currentEndDate = new Date(`${endYear}-12-31`);

        // Update date display
        document.getElementById('start-date-display').textContent = startYear;
        document.getElementById('end-date-display').textContent = endYear;

        // Update map and sidebar
        updateDisplay();
    });
}

/**
 * Initialize modal functionality
 */
function initModal() {
    const modal = document.getElementById('conflict-modal');
    const closeBtn = document.getElementById('modal-close');

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    });
}

/**
 * Get conflicts active during the selected date range
 * @returns {Array} Array of active conflict objects
 */
function getActiveConflicts() {
    return conflicts.filter(conflict => {
        const conflictStart = new Date(conflict.startDate);
        const conflictEnd = new Date(conflict.endDate);

        // Check if conflict overlaps with selected date range
        return conflictStart <= currentEndDate && conflictEnd >= currentStartDate;
    });
}

/**
 * Get presidents in office during the selected date range
 * @returns {Array} Array of president objects
 */
function getActivePresidents() {
    return presidents.filter(president => {
        const termStart = new Date(president.start);
        const termEnd = new Date(president.end);

        // Check if term overlaps with selected date range
        return termStart <= currentEndDate && termEnd >= currentStartDate;
    });
}

/**
 * Update all display elements
 */
function updateDisplay() {
    const activeConflicts = getActiveConflicts();
    const activePresidents = getActivePresidents();

    // Update map highlighting
    if (typeof updateHighlightedCountries === 'function') {
        updateHighlightedCountries(activeConflicts);
    }

    // Update president display
    updatePresidentDisplay(activePresidents);

    // Update conflicts list
    updateConflictsList(activeConflicts);
}

/**
 * Generate initials from a name
 * @param {string} name - Full name
 * @returns {string} Initials (2 characters)
 */
function getInitials(name) {
    const parts = name.split(' ').filter(p => !['D.', 'H.', 'S.', 'W.', 'B.', 'G.', 'F.'].includes(p));
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

/**
 * Generate SVG avatar with initials
 * @param {string} initials - 2 character initials
 * @param {string} party - Political party for color
 * @returns {string} Data URI for SVG
 */
function generateAvatar(initials, party) {
    const bgColor = party === 'Democratic' ? '#1a365d' : '#9b2c2c';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><rect fill="${bgColor}" width="50" height="50" rx="25"/><text x="25" y="32" text-anchor="middle" fill="white" font-family="Arial" font-weight="bold" font-size="18">${initials}</text></svg>`;
    return 'data:image/svg+xml;base64,' + btoa(svg);
}

/**
 * Update the president display panel
 * @param {Array} presidents - Array of active president objects
 */
function updatePresidentDisplay(presidentsArr) {
    const container = document.getElementById('president-display');

    if (presidentsArr.length === 0) {
        container.innerHTML = '<p class="no-conflicts">No president data for this period</p>';
        return;
    }

    container.innerHTML = presidentsArr.map(president => {
        const initials = getInitials(president.name);
        const avatar = generateAvatar(initials, president.party);
        return `
            <div class="president-card">
                <img src="${avatar}" alt="${president.name}">
                <div class="president-info">
                    <div class="president-name">${president.name}</div>
                    <div class="president-dates">${formatPresidentDates(president)}</div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Format president term dates
 * @param {Object} president - President object
 * @returns {string} Formatted date string
 */
function formatPresidentDates(president) {
    const startYear = new Date(president.start).getFullYear();
    const endYear = new Date(president.end).getFullYear();
    return `${startYear} - ${endYear} (${president.party})`;
}

/**
 * Update the conflicts list panel
 * @param {Array} conflicts - Array of active conflict objects
 */
function updateConflictsList(conflictsArr) {
    const container = document.getElementById('conflicts-list');

    if (conflictsArr.length === 0) {
        container.innerHTML = '<p class="no-conflicts">No conflicts in selected period</p>';
        return;
    }

    // Sort by start date
    const sorted = [...conflictsArr].sort((a, b) =>
        new Date(a.startDate) - new Date(b.startDate)
    );

    container.innerHTML = sorted.map(conflict => {
        const startYear = new Date(conflict.startDate).getFullYear();
        const endYear = new Date(conflict.endDate).getFullYear();
        return `
            <div class="conflict-item" onclick="showConflictDetails('${conflict.id}')">
                <div class="conflict-name">${conflict.name}</div>
                <div class="conflict-dates">${startYear} - ${endYear}</div>
            </div>
        `;
    }).join('');
}

/**
 * Show detailed information about a conflict
 * @param {string} conflictId - ID of the conflict to show
 */
function showConflictDetails(conflictId) {
    const conflict = conflicts.find(c => c.id === conflictId);
    if (!conflict) return;

    const modal = document.getElementById('conflict-modal');
    const modalBody = document.getElementById('modal-body');

    const startDate = new Date(conflict.startDate);
    const endDate = new Date(conflict.endDate);
    const dateRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;

    // Get country names
    const countryList = conflict.countries.map(code => getCountryName(code));

    modalBody.innerHTML = `
        <div class="conflict-detail">
            <div class="conflict-detail-header">
                <h2>${conflict.name}</h2>
                <div class="conflict-detail-dates">${dateRange}</div>
            </div>


            <div class="conflict-detail-section">
                <h3>Description</h3>
                <p>${conflict.description}</p>
            </div>

            <div class="conflict-detail-section">
                <h3>Countries Involved</h3>
                <div class="conflict-detail-countries">
                    ${countryList.map(name => `<span class="country-tag">${name}</span>`).join('')}
                </div>
            </div>

            <div class="conflict-detail-section">
                <h3>Casualties</h3>
                <div class="casualties-grid">
                    <div class="casualty-item">
                        <div class="casualty-number">${formatNumber(conflict.casualties.us)}</div>
                        <div class="casualty-label">U.S. Deaths</div>
                    </div>
                    <div class="casualty-item">
                        <div class="casualty-number">${formatNumber(conflict.casualties.total)}</div>
                        <div class="casualty-label">Total Estimated Deaths</div>
                    </div>
                </div>
            </div>

            <div class="conflict-detail-section">
                <h3>Outcome</h3>
                <p>${conflict.outcome}</p>
            </div>

            <div class="conflict-detail-section">
                <a href="${conflict.wikiLink}" target="_blank" rel="noopener noreferrer"
                   class="conflict-detail-link">
                    Learn More on Wikipedia →
                </a>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');

    // Close any open popups on the map
    if (map) {
        map.closePopup();
    }
}

/**
 * Format a date object to a readable string
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Format a number with comma separators
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
function formatNumber(num) {
    return num.toLocaleString('en-US');
}
