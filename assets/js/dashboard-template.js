// dashboard-template.js

window.KPIDashboard = class KPIDashboard {
    constructor(config) {
        this.config = {
            containerId: '',
            dataSources: {},
            defaultFrequency: 'yearly',
            showFrequencyToggle: false,
            defaultTab: 'chart',
            showTable: true,
            frequencies: ['yearly', 'monthly', 'triannual', 'biannual'],
            rowMappings: [], // New property for explicit row mappings
            ...config
        };
        this.charts = [];
        this.container = document.getElementById(this.config.containerId);
        this.data = null;
        this.currentFrequency = this.config.defaultFrequency;
        this.tableColumns = config.tableColumns || [];
        this.rowLabels = []; // Store row labels separately
        
        // Initialize the basic structure
        this.initializeStructure();
    }

    initializeStructure() {
        // Clear the container
        this.container.innerHTML = '';

        // Create toggle container
        if (this.config.showFrequencyToggle) {
            const toggleContainer = document.createElement('div');
            toggleContainer.className = 'frequency-toggle-container mb-4';
            this.container.appendChild(toggleContainer);
        }

        // Create content container
        const contentContainer = document.createElement('div');
        contentContainer.className = 'dashboard-content';
        this.container.appendChild(contentContainer);
    }

    async init() {
        try {
            await this.loadData(this.currentFrequency);
            if (this.config.showFrequencyToggle) {
                this.setupFrequencyToggle();
            }
            this.renderContent();
        } catch (error) {
            console.error('Error initializing dashboard:', error);
            this.showError('Failed to initialize dashboard');
        }
    }

    setupFrequencyToggle() {
        const toggleContainer = this.container.querySelector('.frequency-toggle-container');
        if (!toggleContainer) return;

        // Only show frequencies that have corresponding data sources
        const availableFrequencies = this.config.frequencies.filter(freq => 
            this.config.dataSources[freq]
        );

        const buttons = availableFrequencies.map(freq => `
            <input type="radio" class="btn-check" name="timeFormat" 
                   id="${freq}" value="${freq}" 
                   ${this.currentFrequency === freq ? 'checked' : ''}>
            <label class="btn btn-outline-primary" for="${freq}">
                ${this.getFrequencyLabel(freq)}
            </label>
        `).join('');

        toggleContainer.innerHTML = `
            <div class="d-flex justify-content-center">
                <div class="btn-group shadow-sm rounded" role="group" aria-label="Time format toggle">
                    ${buttons}
                </div>
            </div>
        `;

        // Add event listeners
        toggleContainer.querySelectorAll('input[name="timeFormat"]').forEach(radio => {
            radio.addEventListener('change', async (e) => {
                this.currentFrequency = e.target.value;
                await this.updateDashboard();
            });
        });
    }

    getFrequencyLabel(frequency) {
        const labels = {
            yearly: 'Yearly',
            monthly: 'Monthly',
            triannual: 'By Term',
            biannual: 'By Semester'
        };
        return labels[frequency] || frequency;
    }

    async updateDashboard() {
        try {
            await this.loadData(this.currentFrequency);
            this.destroyCharts();
            this.renderContent();
        } catch (error) {
            console.error('Error updating dashboard:', error);
            this.showError('Failed to update dashboard');
        }
    }

    destroyCharts() {
        this.charts.forEach(chart => chart.destroy());
        this.charts = [];
    }

    parseTerm(term) {
        // Extract term and year from strings like "Spring 2022"
        const parts = term.split(' ');
        const year = parseInt(parts[1]);
        const termName = parts[0];
        
        // Assign numerical values for sorting
        const termOrder = {
            'Spring': 0,
            'Summer': 1,
            'Fall': 2
        };

        return {
            year,
            term: termName,
            sortValue: year * 10 + termOrder[termName]
        };
    }

    async loadData(frequency) {
        const dataSource = this.config.dataSources[frequency];
        if (!dataSource) {
            this.showError(`Data source for frequency "${frequency}" not found.`);
            return;
        }
    
        try {
            // Construct full URL using baseUrl
            const baseUrl = this.config.baseUrl || '';
            const url = dataSource.startsWith('http') ? dataSource : `${baseUrl}${dataSource}`;

            const response = await fetch(url);
            const csvText = await response.text();
            
            // Parse CSV and find the first column name, whatever it might be
            const parsedData = Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true
            });
            
            // Store the first column name for later use
            this.labelColumn = parsedData.meta.fields[0];
            this.data = parsedData.data;
            
            // Automatically set table columns if not provided
            if (this.tableColumns.length === 0 && parsedData.meta.fields) {
                this.tableColumns = parsedData.meta.fields;
            }
    
            this.renderContent();
        } catch (error) {
            this.showError(`Failed to load data: ${error.message}`);
        }
    }

    formatValue(value, metricName) {
        if (typeof value !== 'number') return value;
        
        const metricLower = metricName.toLowerCase();
        // Format based on metric type
        if (metricLower.includes('rate') || metricLower.includes('per')) {
            return value.toFixed(2) + '%';
        }
        if (metricLower.includes('duration')) {
            const hours = Math.floor(value / 3600);
            const minutes = Math.floor((value % 3600) / 60);
            const seconds = Math.floor(value % 60);
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        if (metricLower.includes('savings') || metricLower.includes('cost')) {
            return new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'USD' 
            }).format(value);
        }
        // Format large numbers with commas
        return value.toLocaleString();
    }

    getDataColumns() {
        if (!this.data || !this.data[0]) return [];
        
        // Filter out the label column and any non-numeric/year columns
        const columns = Object.keys(this.data[0]).filter(key => {
            if (key === 'Unnamed: 0') return false;
            // Include if it's a year (4 digits)
            if (key.match(/^\d{4}$/)) return true;
            // Include if any row has a numeric value for this column
            return this.data.some(row => {
                const value = row[key];
                return value !== null && value !== undefined && !isNaN(parseFloat(value));
            });
        });
        
        // Sort columns appropriately based on frequency
        switch (this.currentFrequency) {
            case 'yearly':
                return columns.sort((a, b) => a.localeCompare(b));
            case 'monthly':
                return columns.sort((a, b) => new Date(a) - new Date(b));
            case 'triannual':
            case 'biannual':
                return columns.sort((a, b) => {
                    const termA = this.parseTerm(a);
                    const termB = this.parseTerm(b);
                    return termA.sortValue - termB.sortValue;
                });
            default:
                return columns;
        }
    }

    formatColumnLabel(column) {
        switch (this.currentFrequency) {
            case 'yearly':
                return column.toLowerCase().startsWith('fy') ? `FY${column.slice(2)}` : column;
            case 'monthly':
                return new Date(column).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short' 
                });
            case 'triannual':
            case 'biannual':
                return column; // Keep original term format (e.g., "Spring 2022")
            default:
                return column;
        }
    }

    
processChartData(data, config, chartIndex) {
    const columns = this.getDataColumns();
    const defaultColors = ['#4363d8', 'green', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#e6194b', '#3cb44b', '#ffe119', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080'];

    return {
        labels: columns.map(col => this.formatColumnLabel(col)),
        datasets: config.datasets.map((dataset, index) => {
            const row = this.data[dataset.row_index];
            const colorIndex = (chartIndex + index) % defaultColors.length;
            
            // Get the label using the stored first column name
            const label = row[this.labelColumn] || `Dataset ${dataset.row_index + 1}`;
            console.log(`Creating dataset for row ${dataset.row_index} with label: ${label}`);

            return {
                label: label,
                data: columns.map(col => {
                    let value = row[col];
                    if (value === null || value === undefined || value === '') {
                        return 0;
                    }
                    if (typeof value === 'string') {
                        value = value.replace(/[$,]/g, '');
                    }
                    return parseFloat(value) || 0;
                }),
                borderColor: dataset.color || defaultColors[colorIndex],
                backgroundColor: dataset.color || defaultColors[colorIndex],
                fill: false,
                tension: 0.1
            };
        })
    };
}

getDataColumns() {
    if (!this.data || !this.data[0]) return [];
    
    // Filter out the first column (whatever it's named) and any non-numeric/year columns
    const columns = Object.keys(this.data[0]).filter(key => {
        // Exclude the label column (first column)
        if (key === this.labelColumn) return false;
        // Include if it's a year (4 digits)
        if (key.match(/^\d{4}$/)) return true;
        // Include if any row has a numeric value for this column
        return this.data.some(row => {
            const value = row[key];
            return value !== null && value !== undefined && !isNaN(parseFloat(value));
        });
    });
    
    // Sort columns appropriately based on frequency
    switch (this.currentFrequency) {
        case 'yearly':
            return columns.sort((a, b) => a.localeCompare(b));
        case 'monthly':
            return columns.sort((a, b) => new Date(a) - new Date(b));
        case 'triannual':
        case 'biannual':
            return columns.sort((a, b) => {
                const termA = this.parseTerm(a);
                const termB = this.parseTerm(b);
                return termA.sortValue - termB.sortValue;
            });
        default:
            return columns;
    }
}

    createChart(config, chartIndex) {
        const canvas = document.createElement('canvas');
        const chartContainer = document.createElement('div');
        chartContainer.className = 'mb-4';
        chartContainer.style.height = config.height || '400px';
        chartContainer.appendChild(canvas);

        const chart = new Chart(canvas, {
            type: config.type,
            data: this.processChartData(this.data, config, chartIndex),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: config.title,
                        font: { size: 16 }
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        this.charts.push(chart);
        return chartContainer;
    }

    renderCharts() {
        const chartContainer = this.container.querySelector('#chart') || 
                             this.container.querySelector('.dashboard-content');
        if (!chartContainer) return;
        
        chartContainer.innerHTML = '';
        
        this.config.chartTypes.forEach((chartConfig, index) => {
            const chart = this.createChart(chartConfig, index);
            chartContainer.appendChild(chart);
        });
    }

    /**
     * Creates a responsive table element with a header and body populated from instance data.
     *
     * @returns {HTMLDivElement} A div element containing the responsive table.
     */
    createTable() {
        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-responsive';

        const table = document.createElement('table');
        table.className = 'table table-striped';

        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Create table header
        const headerRow = document.createElement('tr');
        const columns = this.getDataColumns();
        columns.forEach(column => {
            const th = document.createElement('th');
            th.textContent = this.formatColumnLabel(column);
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Create table body
        this.data.forEach(row => {
            const bodyRow = document.createElement('tr');
            columns.forEach(column => {
                const td = document.createElement('td');
                let value = row[column];
                if (typeof value === 'string') {
                    value = value.replace(/[$,]/g, ''); // Remove dollar signs and commas
                }
                td.textContent = value;
                bodyRow.appendChild(td);
            });
            tbody.appendChild(bodyRow);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        tableContainer.appendChild(table);

        return tableContainer;
    }

    renderTable() {
        const tableContainer = this.container.querySelector('#table') || 
                             this.container.querySelector('.dashboard-content');
        if (!tableContainer) return;
        
        tableContainer.innerHTML = '';
        
        const table = this.createTable();
        tableContainer.appendChild(table);
    }

    renderContent() {
        const contentContainer = this.container.querySelector('.dashboard-content');
        if (!contentContainer) return;

        if (this.config.showTable) {
            contentContainer.innerHTML = `
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link ${this.config.defaultTab === 'chart' ? 'active' : ''}" 
                                id="chart-tab" data-bs-toggle="tab" data-bs-target="#chart" 
                                type="button" role="tab" aria-controls="chart" 
                                aria-selected="${this.config.defaultTab === 'chart'}">
                            Charts
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link ${this.config.defaultTab === 'table' ? 'active' : ''}" 
                                id="table-tab" data-bs-toggle="tab" data-bs-target="#table" 
                                type="button" role="tab" aria-controls="table" 
                                aria-selected="${this.config.defaultTab === 'table'}">
                            Table
                        </button>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane fade ${this.config.defaultTab === 'chart' ? 'show active' : ''}" 
                         id="chart" role="tabpanel">
                    </div>
                    <div class="tab-pane fade ${this.config.defaultTab === 'table' ? 'show active' : ''}" 
                         id="table" role="tabpanel">
                    </div>
                </div>
            `;
        }

        this.renderCharts();
        if (this.config.showTable) {
            this.renderTable();
        }
    }

    showError(message) {
        const contentContainer = this.container.querySelector('.dashboard-content');
        if (contentContainer) {
            contentContainer.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    ${message}
                </div>
            `;
        }
    }
};