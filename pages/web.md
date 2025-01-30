---
title: Web Analytics
layout: page
permalink: /web-analytics.html
dashboard:
  container_id: webAnalytics
  data_source: /assets/web-all-yearly
  frequency: yearly
  toggle_frequency: false
  default_tab: chart
  show_table: true
  table_columns:
    - Total users
    - New users
    - Views
    - Views per user
    - Sessions
    - Average session duration
    - Engaged sessions
    - Engagement rate
  charts:
    - type: line
      title: User Growth
      height: 400px
      datasets:
        - label: Total Users
          row_index: 0
          color: '#0d6efd'
        - label: New Users
          row_index: 1
          color: '#6610f2'
    - type: line
      title: Engagement Metrics
      height: 400px
      datasets:
        - label: Views
          row_index: 2
          color: '#198754'
        - label: Sessions
          row_index: 4
          color: '#0dcaf0'
    - type: line
      title: Engagement Rates
      height: 400px
      datasets:
        - label: Views per User
          row_index: 3
          color: '#fd7e14'
        - label: Engagement Rate
          row_index: 7
          color: '#20c997'
---

<div id="webAnalytics"></div>

<!-- Required libraries -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>

<!-- Load dashboard template -->
<script src="{{ '/assets/js/dashboard-template.js' | relative_url }}"></script>

<!-- Initialize dashboard -->
<script>
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