/**
 * US Military Conflicts Data (1900-2025)
 * Loads conflict information from JSON file
 */

let conflicts = [];

// Promise that resolves when conflicts data is loaded
const conflictsLoaded = fetch('./data/conflicts.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to load conflicts data: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        conflicts = data;
        console.log(`Loaded ${conflicts.length} conflicts`);
        return data;
    })
    .catch(error => {
        console.error('Error loading conflicts:', error);
        console.error('If opening directly from file system, use a local server: python -m http.server 8000');
        return [];
    });
