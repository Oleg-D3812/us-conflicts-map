/**
 * Conflicts Data Editor
 * CRUD operations, filtering, and data management
 */

// Storage keys
const STORAGE_KEY = 'conflicts_editor_data';
const MODIFIED_KEY = 'conflicts_editor_modified';

// Application state
let conflicts = [];
let filteredConflicts = [];
let editingId = null;
let deleteId = null;
let sortColumn = 'startDate';
let sortDirection = 'desc';

// LLM Service placeholder for future integration
const llmService = {
    apiKey: localStorage.getItem('llm_api_key') || null,
    provider: localStorage.getItem('llm_provider') || 'openai',

    isConfigured() {
        return this.apiKey !== null;
    },

    setConfig(provider, apiKey) {
        this.provider = provider;
        this.apiKey = apiKey;
        localStorage.setItem('llm_provider', provider);
        localStorage.setItem('llm_api_key', apiKey);
    },

    // Generate conflict from description - to be implemented
    async generateConflict(prompt) {
        if (!this.isConfigured()) {
            throw new Error('LLM not configured. Please set API key.');
        }
        // TODO: Implement API call based on provider
        // Should return a conflict object matching the schema
        console.log('LLM generateConflict called with:', prompt);
        throw new Error('LLM integration not yet implemented');
    },

    // Enhance existing conflict description - to be implemented
    async enhanceDescription(conflict) {
        if (!this.isConfigured()) {
            throw new Error('LLM not configured. Please set API key.');
        }
        // TODO: Implement API call
        console.log('LLM enhanceDescription called for:', conflict.name);
        throw new Error('LLM integration not yet implemented');
    }
};

/**
 * Initialize the editor
 */
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    populateFilters();
    setupEventListeners();
    renderTable();
    updateStatus();
});

/**
 * Load data from localStorage or fetch from JSON
 */
async function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
        try {
            conflicts = JSON.parse(stored);
            console.log(`Loaded ${conflicts.length} conflicts from localStorage`);
            return;
        } catch (e) {
            console.error('Error parsing stored data:', e);
        }
    }

    // Fetch from JSON file
    try {
        const response = await fetch('./data/conflicts.json');
        if (!response.ok) throw new Error('Failed to fetch');
        conflicts = await response.json();
        console.log(`Loaded ${conflicts.length} conflicts from JSON file`);
        // Don't mark as modified since this is initial load
    } catch (error) {
        console.error('Error loading conflicts:', error);
        conflicts = [];
    }
}

/**
 * Save data to localStorage
 */
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conflicts));
    localStorage.setItem(MODIFIED_KEY, 'true');
    updateStatus();
}

/**
 * Check if data has been modified
 */
function isModified() {
    return localStorage.getItem(MODIFIED_KEY) === 'true';
}

/**
 * Clear modified flag
 */
function clearModified() {
    localStorage.removeItem(MODIFIED_KEY);
    updateStatus();
}

/**
 * Populate filter dropdowns
 */
function populateFilters() {
    // Country filter
    const countrySelect = document.getElementById('filter-country');
    const sortedCountries = Object.entries(countryNames)
        .sort((a, b) => a[1].localeCompare(b[1]));

    sortedCountries.forEach(([code, name]) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${name} (${code})`;
        countrySelect.appendChild(option);
    });

    // Type filter
    const typeSelect = document.getElementById('filter-type');
    Object.entries(conflictTypes).forEach(([id, type]) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = type.name;
        typeSelect.appendChild(option);
    });

    // Populate form type dropdown
    const inputType = document.getElementById('input-type');
    Object.entries(conflictTypes).forEach(([id, type]) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = type.name;
        inputType.appendChild(option);
    });

    // Populate form countries multi-select
    const inputCountries = document.getElementById('input-countries');
    sortedCountries.forEach(([code, name]) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${name} (${code})`;
        inputCountries.appendChild(option);
    });
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Toolbar buttons
    document.getElementById('btn-add').addEventListener('click', openAddModal);
    document.getElementById('btn-import').addEventListener('click', () => document.getElementById('import-file').click());
    document.getElementById('btn-export').addEventListener('click', exportData);
    document.getElementById('btn-reset').addEventListener('click', openResetModal);

    // Import file handler
    document.getElementById('import-file').addEventListener('change', handleImport);

    // Filters
    document.getElementById('search-input').addEventListener('input', applyFilters);
    document.getElementById('filter-country').addEventListener('change', applyFilters);
    document.getElementById('filter-type').addEventListener('change', applyFilters);

    // Sortable columns
    document.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', () => handleSort(th.dataset.sort));
    });

    // Edit modal
    document.getElementById('modal-close').addEventListener('click', closeEditModal);
    document.getElementById('btn-cancel').addEventListener('click', closeEditModal);
    document.getElementById('conflict-form').addEventListener('submit', handleFormSubmit);

    // Auto-generate ID from name
    document.getElementById('input-name').addEventListener('input', (e) => {
        if (!editingId) {
            document.getElementById('input-id').value = generateId(e.target.value);
        }
    });

    // Delete modal
    document.getElementById('btn-delete-cancel').addEventListener('click', closeDeleteModal);
    document.getElementById('btn-delete-confirm').addEventListener('click', confirmDelete);

    // Reset modal
    document.getElementById('btn-reset-cancel').addEventListener('click', closeResetModal);
    document.getElementById('btn-reset-confirm').addEventListener('click', confirmReset);

    // Close modals on backdrop click
    ['edit-modal', 'delete-modal', 'reset-modal'].forEach(id => {
        document.getElementById(id).addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.add('hidden');
            }
        });
    });

    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeEditModal();
            closeDeleteModal();
            closeResetModal();
        }
    });
}

/**
 * Generate ID from name
 */
function generateId(name) {
    let id = name.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);

    // Check for duplicates
    let baseId = id;
    let counter = 1;
    while (conflicts.some(c => c.id === id && c.id !== editingId)) {
        id = `${baseId}-${counter}`;
        counter++;
    }

    return id;
}

/**
 * Apply filters and re-render table
 */
function applyFilters() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const countryFilter = document.getElementById('filter-country').value;
    const typeFilter = document.getElementById('filter-type').value;

    filteredConflicts = conflicts.filter(conflict => {
        // Search filter
        if (searchTerm) {
            const matchesSearch =
                conflict.name.toLowerCase().includes(searchTerm) ||
                conflict.description.toLowerCase().includes(searchTerm) ||
                conflict.id.toLowerCase().includes(searchTerm);
            if (!matchesSearch) return false;
        }

        // Country filter
        if (countryFilter && !conflict.countries.includes(countryFilter)) {
            return false;
        }

        // Type filter
        if (typeFilter && conflict.type !== typeFilter) {
            return false;
        }

        return true;
    });

    // Apply sort
    sortConflicts();
    renderTable();
    updateStatus();
}

/**
 * Handle column sort
 */
function handleSort(column) {
    if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortDirection = 'asc';
    }

    // Update sort indicators
    document.querySelectorAll('.sortable').forEach(th => {
        th.classList.remove('asc', 'desc');
        if (th.dataset.sort === sortColumn) {
            th.classList.add(sortDirection);
        }
    });

    sortConflicts();
    renderTable();
}

/**
 * Sort conflicts array
 */
function sortConflicts() {
    filteredConflicts.sort((a, b) => {
        let valA = a[sortColumn];
        let valB = b[sortColumn];

        if (sortColumn === 'type') {
            valA = conflictTypes[valA]?.name || valA;
            valB = conflictTypes[valB]?.name || valB;
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
}

/**
 * Render the conflicts table
 */
function renderTable() {
    const tbody = document.getElementById('conflicts-tbody');

    if (filteredConflicts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    <h3>No conflicts found</h3>
                    <p>Try adjusting your filters or add a new conflict.</p>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filteredConflicts.map(conflict => {
        const type = conflictTypes[conflict.type] || { name: conflict.type, color: '#666' };
        const countries = conflict.countries
            .map(code => `<span class="country-tag">${code}</span>`)
            .join('');

        return `
            <tr data-id="${conflict.id}">
                <td><strong>${escapeHtml(conflict.name)}</strong></td>
                <td>
                    <span class="type-badge" style="background-color: ${type.color}">
                        ${escapeHtml(type.name)}
                    </span>
                </td>
                <td><div class="country-tags">${countries}</div></td>
                <td>${formatDate(conflict.startDate)}</td>
                <td>${formatDate(conflict.endDate)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon edit" onclick="openEditModal('${conflict.id}')" title="Edit">&#9998;</button>
                        <button class="btn-icon delete" onclick="openDeleteModal('${conflict.id}')" title="Delete">&#128465;</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * Update status bar
 */
function updateStatus() {
    const total = conflicts.length;
    const showing = filteredConflicts.length;

    document.getElementById('status-count').textContent =
        showing === total
            ? `Showing all ${total} conflicts`
            : `Showing ${showing} of ${total} conflicts`;

    const modifiedEl = document.getElementById('status-modified');
    if (isModified()) {
        modifiedEl.classList.remove('hidden');
    } else {
        modifiedEl.classList.add('hidden');
    }
}

/**
 * Open add modal
 */
function openAddModal() {
    editingId = null;
    document.getElementById('modal-title').textContent = 'Add New Conflict';
    document.getElementById('conflict-form').reset();
    document.getElementById('input-id').value = '';
    document.getElementById('input-casualties-us').value = '0';
    document.getElementById('input-casualties-total').value = '0';
    document.getElementById('edit-modal').classList.remove('hidden');
}

/**
 * Open edit modal
 */
function openEditModal(id) {
    const conflict = conflicts.find(c => c.id === id);
    if (!conflict) return;

    editingId = id;
    document.getElementById('modal-title').textContent = 'Edit Conflict';

    // Populate form
    document.getElementById('input-name').value = conflict.name;
    document.getElementById('input-id').value = conflict.id;
    document.getElementById('input-type').value = conflict.type;
    document.getElementById('input-start').value = conflict.startDate;
    document.getElementById('input-end').value = conflict.endDate;
    document.getElementById('input-description').value = conflict.description;
    document.getElementById('input-casualties-us').value = conflict.casualties?.us || 0;
    document.getElementById('input-casualties-total').value = conflict.casualties?.total || 0;
    document.getElementById('input-outcome').value = conflict.outcome || '';
    document.getElementById('input-wikilink').value = conflict.wikiLink || '';

    // Select countries
    const countriesSelect = document.getElementById('input-countries');
    Array.from(countriesSelect.options).forEach(option => {
        option.selected = conflict.countries.includes(option.value);
    });

    document.getElementById('edit-modal').classList.remove('hidden');
}

/**
 * Close edit modal
 */
function closeEditModal() {
    document.getElementById('edit-modal').classList.add('hidden');
    editingId = null;
}

/**
 * Handle form submit
 */
function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
        id: document.getElementById('input-id').value || generateId(document.getElementById('input-name').value),
        name: document.getElementById('input-name').value,
        type: document.getElementById('input-type').value,
        countries: Array.from(document.getElementById('input-countries').selectedOptions).map(o => o.value),
        startDate: document.getElementById('input-start').value,
        endDate: document.getElementById('input-end').value,
        description: document.getElementById('input-description').value,
        casualties: {
            us: parseInt(document.getElementById('input-casualties-us').value) || 0,
            total: parseInt(document.getElementById('input-casualties-total').value) || 0
        },
        outcome: document.getElementById('input-outcome').value,
        wikiLink: document.getElementById('input-wikilink').value
    };

    if (editingId) {
        // Update existing
        const index = conflicts.findIndex(c => c.id === editingId);
        if (index !== -1) {
            conflicts[index] = formData;
        }
    } else {
        // Add new
        conflicts.push(formData);
    }

    saveData();
    closeEditModal();
    applyFilters();
}

/**
 * Open delete confirmation modal
 */
function openDeleteModal(id) {
    const conflict = conflicts.find(c => c.id === id);
    if (!conflict) return;

    deleteId = id;
    document.getElementById('delete-message').textContent =
        `Are you sure you want to delete "${conflict.name}"?`;
    document.getElementById('delete-modal').classList.remove('hidden');
}

/**
 * Close delete modal
 */
function closeDeleteModal() {
    document.getElementById('delete-modal').classList.add('hidden');
    deleteId = null;
}

/**
 * Confirm delete
 */
function confirmDelete() {
    if (deleteId) {
        conflicts = conflicts.filter(c => c.id !== deleteId);
        saveData();
        applyFilters();
    }
    closeDeleteModal();
}

/**
 * Open reset confirmation modal
 */
function openResetModal() {
    document.getElementById('reset-modal').classList.remove('hidden');
}

/**
 * Close reset modal
 */
function closeResetModal() {
    document.getElementById('reset-modal').classList.add('hidden');
}

/**
 * Confirm reset
 */
async function confirmReset() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(MODIFIED_KEY);

    // Reload from JSON
    try {
        const response = await fetch('./data/conflicts.json');
        if (!response.ok) throw new Error('Failed to fetch');
        conflicts = await response.json();
    } catch (error) {
        console.error('Error reloading conflicts:', error);
        conflicts = [];
    }

    closeResetModal();
    applyFilters();
}

/**
 * Export data as JSON file
 */
function exportData() {
    const dataStr = JSON.stringify(conflicts, null, 4);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'conflicts.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    clearModified();
}

/**
 * Handle import file selection
 */
function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const imported = JSON.parse(event.target.result);
            if (!Array.isArray(imported)) {
                throw new Error('Invalid format: expected array');
            }
            conflicts = imported;
            saveData();
            applyFilters();
            alert(`Successfully imported ${conflicts.length} conflicts.`);
        } catch (error) {
            alert('Error importing file: ' + error.message);
        }
    };
    reader.readAsText(file);

    // Reset file input
    e.target.value = '';
}

/**
 * Format date for display
 */
function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize filtered conflicts on first load
filteredConflicts = conflicts;
