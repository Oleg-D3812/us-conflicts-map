/**
 * Main application logic
 * Handles timeline, filtering, and UI updates
 */

// Application state
let currentStartDate = new Date('2016-01-01');
let currentEndDate = new Date('2026-12-31');
let slider;
let selectedPresident = null;
let isPresidentSelection = false; // Flag to track programmatic slider changes

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
        start: [2016, 2026],
        connect: true,
        step: 1,
        range: {
            'min': 1900,
            'max': 2026
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

    // Clear president selection only when user manually drags the slider
    slider.on('slide', () => {
        if (!isPresidentSelection) {
            selectedPresident = null;
        }
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

    // Update map highlighting
    if (typeof updateHighlightedCountries === 'function') {
        updateHighlightedCountries(activeConflicts);
    }

    // Update president display (shows all, highlights active)
    updatePresidentDisplay();

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
 * Check if a president's term overlaps with the current date range
 * @param {Object} president - President object
 * @returns {boolean} True if president is active in current range
 */
function isPresidentActive(president) {
    const termStart = new Date(president.start);
    const termEnd = new Date(president.end);
    return termStart <= currentEndDate && termEnd >= currentStartDate;
}

/**
 * Update the president display panel - shows ALL presidents, highlights active ones
 */
function updatePresidentDisplay() {
    const container = document.getElementById('president-display');

    container.innerHTML = presidents.map((president, index) => {
        // Use LOC portrait if available, otherwise fall back to generated avatar
        const initials = getInitials(president.name);
        const fallbackAvatar = generateAvatar(initials, president.party);
        const imgSrc = president.portrait || fallbackAvatar;
        const isSelected = selectedPresident &&
            selectedPresident.name === president.name &&
            selectedPresident.start === president.start;
        const isActive = isPresidentActive(president);

        let cardClass = 'president-card';
        if (isSelected) {
            cardClass += ' selected';
        } else if (isActive) {
            cardClass += ' active';
        } else {
            cardClass += ' inactive';
        }

        return `
            <div class="${cardClass}"
                 onclick="selectPresident('${president.start}')"
                 title="Click to highlight conflicts during this presidency">
                <img src="${imgSrc}" alt="${president.name}" onerror="this.src='${fallbackAvatar}'">
                <div class="president-info">
                    <div class="president-name">${president.name}</div>
                    <div class="president-dates">${formatPresidentDates(president)}</div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Handle president selection - highlights conflicts during their term
 * @param {string} startDate - The president's term start date
 */
function selectPresident(startDate) {
    const president = presidents.find(p => p.start === startDate);

    if (!president) return;

    // Toggle selection if clicking the same president
    if (selectedPresident && selectedPresident.start === startDate) {
        selectedPresident = null;
        isPresidentSelection = true;
        // Reset slider to full range
        slider.set([1900, 2026]);
        isPresidentSelection = false;
        return;
    }

    selectedPresident = president;

    // Get president's term years
    const termStartYear = new Date(president.start).getFullYear();
    const termEndYear = new Date(president.end).getFullYear();

    // Update slider to match president's term
    isPresidentSelection = true;
    slider.set([termStartYear, termEndYear]);
    isPresidentSelection = false;
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
        const type = conflictTypes[conflict.type];
        return `
            <div class="conflict-item" onclick="showConflictDetails('${conflict.id}')">
                <span class="conflict-type-indicator" style="background-color: ${type ? type.color : '#e53e3e'}"></span>
                <div class="conflict-item-content">
                    <div class="conflict-name">${conflict.name}</div>
                    <div class="conflict-dates">${startYear} - ${endYear}</div>
                </div>
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

    const conflictType = conflictTypes[conflict.type];
    modalBody.innerHTML = `
        <div class="conflict-detail">
            <div class="conflict-detail-header">
                <h2>${conflict.name}</h2>
                <div class="conflict-detail-dates">${dateRange}</div>
                <div class="conflict-type-badge" style="background-color: ${conflictType ? conflictType.color : '#e53e3e'}">
                    ${conflictType ? conflictType.name : 'Unknown Type'}
                </div>
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
