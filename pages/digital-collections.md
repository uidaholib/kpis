---
title: Digital Collections
layout: dashboard
permalink: /digital-collections.html
dashboard:
  container_id: digitalCollections
  data_sources:
    yearly: /assets/digital-collections.csv
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
      datasets:
        - row_index: 0
    - type: line
      title: Total Items Growth
      datasets:
        - row_index: 1
          color: green
    - type: bar
      title: Collections Added by Year
      datasets:
        - row_index: 2
    - type: bar
      title: Items Added by Year
      datasets:
        - row_index: 3
          color: green
---