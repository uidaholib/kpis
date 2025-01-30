---
title: Digital Collections
layout: dashboard
permalink: /digital-collections.html
dashboard:
  container_id: digitalCollections
  data_sources:
    yearly: /assets/digital-collections-yearly
  default_frequency: yearly
  show_frequency_toggle: false
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
