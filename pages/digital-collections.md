---
title: Digital Collections
layout: page
permalink: /digital-collections.html
dashboard:
  container_id: digitalCollections
  data_source: /assets/digital-collections
  frequency: yearly
  toggle_frequency: true
  default_tab: chart
  show_table: true
  table_columns:
    - Total Collections
    - Total Items
    - Collections Added
    - Items Added
  charts:
    - type: line
      title: Total Collections Growth
      height: 400px
      datasets:
        - label: Total Collections
          row_index: 0
          color: '#0d6efd'
    - type: line
      title: Total Items Growth
      height: 400px
      datasets:
        - label: Total Items
          row_index: 1
          color: '#198754'
    - type: bar
      title: Collections Added by Year
      height: 400px
      datasets:
        - label: Collections Added
          row_index: 2
          color: 'rgba(13, 110, 253, 0.7)'
    - type: bar
      title: Items Added by Year
      height: 400px
      datasets:
        - label: Items Added
          row_index: 3
          color: 'rgba(25, 135, 84, 0.7)'
---

<div id="digitalCollections"></div>

<!-- Required libraries -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>

<!-- Load dashboard template -->
<script src="{{ '/assets/js/dashboard-template.js' | relative_url }}"></script>

<!-- Initialize dashboard -->
<script>
// Wait for both DOM and dashboard template to be loaded
window.addEventListener('load', async function() {
    if (typeof KPIDashboard === 'undefined') {
        console.error('Dashboard template failed to load');
        return;
    }

    try {
        const dashboard = new KPIDashboard({
            containerId: '{{ page.dashboard.container_id }}',
            dataSource: '{{ page.dashboard.data_source }}',
            frequency: '{{ page.dashboard.frequency }}',
            toggleFrequency: {{ page.dashboard.toggle_frequency }},
            defaultTab: '{{ page.dashboard.default_tab }}',
            showTable: {{ page.dashboard.show_table }},
            tableColumns: {{ page.dashboard.table_columns | jsonify }},
            chartTypes: {{ page.dashboard.charts | jsonify }}
        });
        
        await dashboard.init();
    } catch (error) {
        console.error('Failed to initialize dashboard:', error);
    }
});</script>