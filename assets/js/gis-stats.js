// gis-stats.js

document.addEventListener('DOMContentLoaded', function() {
    // Create toggle switch container
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'mb-4 d-flex justify-content-center';
    toggleContainer.innerHTML = `
        <div class="btn-group shadow-sm rounded" role="group" aria-label="Data frequency toggle">
            <input type="radio" class="btn-check" name="table-frequency" id="table-yearly" value="yearly" checked>
            <label class="btn btn-outline-primary rounded-start" for="table-yearly">Yearly</label>
            
            <input type="radio" class="btn-check" name="table-frequency" id="table-monthly" value="monthly">
            <label class="btn btn-outline-primary rounded-end" for="table-monthly">Monthly</label>
        </div>
    `;

    // Function to clean number values
    function cleanNumber(value) {
        if (typeof value === 'string') {
            // Remove commas and convert to number
            return parseFloat(value.replace(/,/g, ''));
        }
        return value;
    }
    
    // Function to create table
    function createTable() {
        const container = document.createElement('div');
        container.className = 'table-responsive';
        
        const table = document.createElement('table');
        table.className = 'table table-striped table-hover';
        
        const thead = document.createElement('thead');
        thead.className = 'table-dark';
        thead.innerHTML = `
            <tr>
                <th>Time Period</th>
                <th>Unique Users</th>
                <th>New Users</th>
                <th>Items Created</th>
                <th>Unique Creators</th>
                <th>Item Views</th>
            </tr>
        `;
        
        const tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(table);
        
        return container;
    }
    
    // Function to format numbers with commas
    const formatNumber = (num) => {
        if (num === null || num === undefined || isNaN(num)) return '-';
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Function to process CSV data and update table
    function processData(results, container) {
        const data = results.data;
        const tbody = container.querySelector('tbody');
        tbody.innerHTML = ''; // Clear existing rows
        
        // Get all time periods (excluding the first column)
        const periods = Object.keys(data[0]).filter(key => key !== 'Unnamed: 0');
        
        // Process each period
        periods.forEach(period => {
            const row = document.createElement('tr');
            
            // Get values for each category
            const uniqueUsers = cleanNumber(data[0][period]);
            const newUsers = cleanNumber(data[1] ? data[1][period] : null);
            const itemsCreated = cleanNumber(data[2] ? data[2][period] : null);
            const uniqueCreators = cleanNumber(data[3] ? data[3][period] : null);
            const itemViews = cleanNumber(data[4] ? data[4][period] : null);
            
            row.innerHTML = `
                <td>${period}</td>
                <td>${formatNumber(uniqueUsers)}</td>
                <td>${formatNumber(newUsers)}</td>
                <td>${formatNumber(itemsCreated)}</td>
                <td>${formatNumber(uniqueCreators)}</td>
                <td>${formatNumber(itemViews)}</td>
            `;
            
            tbody.appendChild(row);
        });
    }
    
    // Function to load and display data
    async function loadData(frequency, tableContainer) {
        const filePath = frequency === 'yearly' ? '/assets/gis-yearly.csv' : '/assets/gis-monthly.csv';
        
        try {
            const response = await fetch(filePath);
            const text = await response.text();
            
            Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
                complete: function(results) {
                    processData(results, tableContainer);
                },
                error: function(error) {
                    console.error('Error parsing CSV:', error);
                    const tbody = tableContainer.querySelector('tbody');
                    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-danger">Error loading data</td></tr>';
                }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            const tbody = tableContainer.querySelector('tbody');
            tbody.innerHTML = '<tr><td colspan="6" class="text-center text-danger">Error loading data</td></tr>';
        }
    }
    
    // Initialize table and toggle
    const targetElement = document.getElementById('gis-stats');
    if (targetElement) {
        // Add toggle
        targetElement.appendChild(toggleContainer);
        
        // Create and add table
        const tableContainer = createTable();
        targetElement.appendChild(tableContainer);
        
        // Add event listeners for toggle buttons
        document.querySelectorAll('input[name="table-frequency"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                loadData(e.target.value, tableContainer);
            });
        });
        
        // Load initial data (yearly)
        loadData('yearly', tableContainer);
    } else {
        console.error('Target element #gis-stats not found');
    }
});