// dashboard-base.js

window.KPIDashboard = class KPIDashboard {
    constructor(config) {
        this.config = {
            containerId: '',
            dataSource: '',
            frequency: 'yearly',
            chartTypes: [],
            toggleFrequency: false,
            defaultTab: 'chart',
            ...config
        };
        this.charts = [];
        this.container = document.getElementById(this.config.containerId);
        this.data = null;
        this.dataType = 'standard'; // or 'fiscal'
    }

    async init() {
        try {
            await this.loadData();
            // Detect data type based on column headers
            this.detectDataType();
            this.render();
        } catch (error) {
            console.error('Error initializing dashboard:', error);
            this.showError('Failed to initialize dashboard');
        }
    }

    detectDataType() {
        if (!this.data || !this.data[0]) return;
        const headers = Object.keys(this.data[0]);
        this.dataType = headers.some(h => h.toLowerCase().startsWith('fy')) ? 'fiscal' : 'standard';
    }

    async loadData() {
        try {
            const response = await fetch(this.config.dataSource + '.csv');
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
            console.log('Loaded data:', this.data);
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
        // Format large numbers with commas
        return value.toLocaleString();
    }

    getDataColumns() {
        if (!this.data || !this.data[0]) return [];
        return Object.keys(this.data[0]).filter(key => {
            if (this.dataType === 'fiscal') {
                return key.toLowerCase().startsWith('fy');
            }
            return !isNaN(parseInt(key)) || key.match(/\d{4}/);
        }).sort();
    }

    processChartData(data, config) {
        const columns = this.getDataColumns();
        
        return {
            labels: columns.map(col => this.dataType === 'fiscal' ? `FY${col.slice(2)}` : col),
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
            th.textContent = this.dataType === 'fiscal' ? `FY${col.slice(2)}` : col;
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

    render() {
        if (this.config.showTable) {
            this.container.innerHTML = `
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
        const chartContainer = this.container.querySelector('#chart') || this.container;
        chartContainer.innerHTML = '';
        
        this.config.chartTypes.forEach(chartConfig => {
            const chart = this.createChart(chartConfig);
            chartContainer.appendChild(chart);
        });
    }

    renderTable() {
        const tableContainer = this.container.querySelector('#table');
        if (tableContainer) {
            const table = this.createTable();
            tableContainer.innerHTML = '';
            tableContainer.appendChild(table);
        }
    }

    showError(message) {
        this.container.innerHTML = `
            <div class="alert alert-danger" role="alert">
                ${message}
            </div>
        `;
    }
};