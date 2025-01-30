---
title: Open Access Publishing Fund (OAPF)
layout: dashboard
permalink: /open-publishing.html
dashboard:
  container_id: oapfStats
  data_sources:
    biannual: /assets/oapf
  default_frequency: biannual
  show_frequency_toggle: true
  default_tab: chart
  show_table: true
  table_columns:
    - Funded Articles
    - Amount Expended
    - Number of Departments
  charts:
    - type: line
      title: Articles Funded and Departments Impacted
      height: 400px
      datasets:
        - label: Funded Articles
          row_index: 0
          color: '#0d6efd'
        - label: Number of Departments
          row_index: 2
          color: '#6610f2'
    - type: bar
      title: Funds Expended
      height: 400px
      datasets:
        - label: Amount Expended
          row_index: 1
          color: '#20c997'
---
