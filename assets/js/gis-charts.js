// Create the charts when the document is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Create toggle switch container
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'mb-4 d-flex justify-content-center';
    toggleContainer.innerHTML = `
        <div class="btn-group shadow-sm rounded" role="group" aria-label="Data frequency toggle">
            <input type="radio" class="btn-check" name="frequency" id="yearly" value="yearly" checked>
            <label class="btn btn-outline-primary rounded-start" for="yearly">Yearly</label>
            
            <input type="radio" class="btn-check" name="frequency" id="monthly" value="monthly">
            <label class="btn btn-outline-primary rounded-end" for="monthly">Monthly</label>
        </div>
    `;

    // Add toggle to page
    const targetElement = document.getElementById('gis-charts-container');
    if (targetElement) {
        targetElement.insertBefore(toggleContainer, targetElement.firstChild);
    }

    // Function to clean number values
    function cleanNumber(value) {
        if (typeof value === 'string') {
            // Remove commas and convert to number
            return parseFloat(value.replace(/,/g, ''));
        }
        return value;
    }

    // Function to fetch and process the CSV data
    async function fetchData(frequency) {
        try {
            const filePath = frequency === 'yearly' ? '/assets/gis-yearly.csv' : '/assets/gis-monthly.csv';
            const response = await fetch(filePath);
            const text = await response.text();
            
            // Parse CSV with pre-processing to handle commas in numbers
            const results = Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
                transform: function(value) {
                    // Try to clean numbers, but keep original value if not a number
                    const cleaned = cleanNumber(value);
                    return !isNaN(cleaned) ? cleaned : value;
                }
            });
            
            return results.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    // Function to get line colors
    function getLineColor(index) {
        const colors = [
            'rgb(75, 192, 192)',    // Teal
            'rgb(255, 99, 132)',    // Red
            'rgb(54, 162, 235)',    // Blue
            'rgb(153, 102, 255)'    // Purple
        ];
        return colors[index % colors.length];
    }

    // Function to filter last 24 periods of data
    function getLast24Periods(periods) {
        return periods.slice(-24);
    }

    let charts = {
        users: null,
        items: null,
        views: null
    };

    // Create and render the users chart
    async function createUsersChart(rawData, periods, chartTitle) {
        const canvasElement = document.getElementById('gisUsersChart');
        if (!canvasElement) {
            console.error('Users canvas element not found');
            return;
        }

        const datasets = [
            {
                label: 'Unique Users',
                data: periods.map(period => rawData[0][period] || 0),
                borderColor: getLineColor(0),
                backgroundColor: getLineColor(0),
                fill: false,
                tension: 0.4
            },
            {
                label: 'New Users',
                data: periods.map(period => rawData[1][period] || 0),
                borderColor: getLineColor(1),
                backgroundColor: getLineColor(1),
                fill: false,
                tension: 0.4
            },
            {
                label: 'Unique Creators',
                data: periods.map(period => rawData[3][period] || 0),
                borderColor: getLineColor(2),
                backgroundColor: getLineColor(2),
                fill: false,
                tension: 0.4
            }
        ];

        if (charts.users) {
            charts.users.destroy();
        }

        charts.users = new Chart(canvasElement, {
            type: 'line',
            data: { labels: periods, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: chartTitle,
                        font: { size: 16 }
                    },
                    legend: { position: 'bottom' }
                },
                scales: {
                    x: {
                        ticks: { maxRotation: 45, minRotation: 45 }
                    },
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Create and render the items chart
    async function createItemsChart(rawData, periods, chartTitle) {
        const canvasElement = document.getElementById('gisItemsChart');
        if (!canvasElement) {
            console.error('Items canvas element not found');
            return;
        }

        const datasets = [
            {
                label: 'Items Created',
                data: periods.map(period => rawData[2][period] || 0),
                borderColor: getLineColor(2),
                backgroundColor: getLineColor(2),
                fill: false,
                tension: 0.4
            }
        ];

        if (charts.items) {
            charts.items.destroy();
        }

        charts.items = new Chart(canvasElement, {
            type: 'line',
            data: { labels: periods, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: chartTitle,
                        font: { size: 16 }
                    },
                    legend: { position: 'bottom' }
                },
                scales: {
                    x: {
                        ticks: { maxRotation: 45, minRotation: 45 }
                    },
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Create and render the views chart (last 24 periods)
    async function createViewsChart(rawData, allPeriods, chartTitle) {
        const canvasElement = document.getElementById('gisViewsChart');
        if (!canvasElement) {
            console.error('Views canvas element not found');
            return;
        }

        const periods = getLast24Periods(allPeriods);
        const datasets = [
            {
                label: 'Item Views',
                data: periods.map(period => rawData[4][period] || 0),
                borderColor: getLineColor(3),
                backgroundColor: getLineColor(3),
                fill: false,
                tension: 0.4
            }
        ];

        if (charts.views) {
            charts.views.destroy();
        }

        charts.views = new Chart(canvasElement, {
            type: 'line',
            data: { labels: periods, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: chartTitle,
                        font: { size: 16 }
                    },
                    legend: { position: 'bottom' }
                },
                scales: {
                    x: {
                        ticks: { maxRotation: 45, minRotation: 45 }
                    },
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Function to update all charts
    async function updateCharts(frequency) {
        try {
            const rawData = await fetchData(frequency);
            const periods = Object.keys(rawData[0]).filter(key => key !== 'Unnamed: 0');
            const titleSuffix = frequency === 'yearly' ? 'by Year' : 'by Month';
            
            await Promise.all([
                createUsersChart(rawData, periods, `GIS Users and Creators ${titleSuffix}`),
                createItemsChart(rawData, periods, `GIS Items Created ${titleSuffix}`),
                createViewsChart(rawData, periods, `GIS Item Views ${titleSuffix} (Last 24 Periods)`)
            ]);
        } catch (error) {
            console.error('Failed to update charts:', error);
        }
    }

    // Add event listeners for toggle buttons
    document.querySelectorAll('input[name="frequency"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            updateCharts(e.target.value);
        });
    });

    // Initialize charts with yearly data
    updateCharts('yearly');
});