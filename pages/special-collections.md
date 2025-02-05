---
title: Special Collections
layout: dashboard
permalink: /special-collections.html
dashboard:
  container_id: specialCollections
  data_sources:
    yearly: /kpidata/special-collections.csv
  default_frequency: yearly
  show_frequency_toggle: false
  default_tab: chart
  show_table: true
  charts:
    - type: bar
      title: Finding Aids
      datasets:
        - row_index: 0
        - row_index: 1
        - row_index: 2
    - type: bar
      title: Archives West Data
      datasets:
        - row_index: 3
    - type: bar
      title: Patron Interactions
      datasets:
        - row_index: 4
        - row_index: 5
        - row_index: 6
    - type: bar
      title: Linear Feet
      datasets:
        - row_index: 7
---