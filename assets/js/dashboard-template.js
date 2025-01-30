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
            ...config
        };
        this.charts = [];
        this.container = document.getElementById(this.config.containerId);
        this.data = null;
        this.currentFrequency = this.config.defaultFrequency;
        
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
        try {
            const response = await fetch(this.config.dataSources[frequency] + '.csv');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            
            const parseResult = Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
                transformHeader: header => header.trim() || 'metric',
                transform: (value, column) => {
                    if (!value) return 0;
                    // Handle currency values
                    if (typeof value === 'string' && value.includes('$')) {
                        return parseFloat(value.replace(/[$,]/g, ''));
                    }
                    // Handle percentages
                    if (typeof value === 'string' && value.includes('%')) {
                        return parseFloat(value.replace('%', ''));
                    }
                    // Handle time duration
                    if (typeof value === 'string' && value.includes(':')) {
                        const [hours, minutes, seconds] = value.split(':').map(Number);
                        return hours * 3600 + minutes * 60 + seconds;
                    }
                    // Handle numbers with commas
                    if (typeof value === 'string' && value.includes(',')) {
                        return parseFloat(value.replace(/,/g, ''));
                    }
                    // Try to convert to number if possible
                    const num = parseFloat(value);
                    return isNaN(num) ? value : num;
                }
            });

            this.data = parseResult.data;
        } catch (error) {
            console.error('Error loading data:', error);
            throw error;
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
        const columns = Object.keys(this.data[0]).filter(key => key !== 'metric');
        
        // Sort columns appropriately based on frequency
        switch (this.currentFrequency) {
            case 'yearly':
                return columns.sort();
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

    processChartData(data, config) {
        const columns = this.getDataColumns();
        
        return {
            labels: columns.map(col => this.formatColumnLabel(col)),
            datasets: config.datasets.map(dataset => {
                const row = this.data[dataset.row_index];
                return {
                    label: dataset.label,
                    data: columns.map(col => {
                        const value = row[col];
                        return typeof value === 'number' ? value : 0;
                    }),
                    borderColor: dataset.color,
                    backgroundColor: dataset.color,
                    fill: false,
                    tension: 0.1
                };
            })
        };
    }

    createChart(config) {
        const canvas = document.createElement('canvas');
        const chartContainer = document.createElement('div');
        chartContainer.className = 'mb-4';
        chartContainer.style.height = config.height || '400px';
        chartContainer.appendChild(canvas);

        const chart = new Chart(canvas, {
            type: config.type,
            data: this.processChartData(this.data, config),
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

    createTable() {
        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-responsive';
        
        const table = document.createElement('table');
        table.className = 'table table-striped table-hover';
        
        const thead = document.createElement('thead');
        thead.className = 'table-dark';
        const headerRow = document.createElement('tr');
        
        const columns = this.getDataColumns();
        
        // Add Metric header
        const metricHeader = document.createElement('th');
        metricHeader.textContent = 'Metric';
        headerRow.appendChild(metricHeader);
        
        // Add column headers
        columns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = this.formatColumnLabel(col);
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        const tbody = document.createElement('tbody');
        this.data.forEach(row => {
            if (row.metric && (!this.config.tableColumns || this.config.tableColumns.includes(row.metric))) {
                const tr = document.createElement('tr');
                
                // Add metric name
                const tdName = document.createElement('td');
                tdName.textContent = row.metric;
                tr.appendChild(tdName);
                
                // Add values for each column
                columns.forEach(col => {
                    const td = document.createElement('td');
                    td.textContent = this.formatValue(row[col], row.metric);
                    tr.appendChild(td);
                });
                
                tbody.appendChild(tr);
            }
        });
        
        table.appendChild(tbody);
        tableContainer.appendChild(table);
        
        return tableContainer;
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

    renderCharts() {
        const chartContainer = this.container.querySelector('#chart') || 
                             this.container.querySelector('.dashboard-content');
        if (!chartContainer) return;
        
        chartContainer.innerHTML = '';
        
        this.config.chartTypes.forEach(chartConfig => {
            const chart = this.createChart(chartConfig);
            chartContainer.appendChild(chart);
        });
    }

    renderTable() {
        const tableContainer = this.container.querySelector('#table');
        if (!tableContainer) return;
        
        const table = this.createTable();
        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);
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