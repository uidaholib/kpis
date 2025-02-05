---
title: Special Collections
layout: dashboard
permalink: /special-collections.html
dashboard:
  container_id: specialCollections
  data_sources:
    yearly: /assets/special-collections.csv
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
    - type: bar
      title: Collections Added by Year
      datasets:
        - row_index: 2
    - type: bar
      title: Items Added by Year
      datasets:
        - row_index: 3
---