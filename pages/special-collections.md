---
title: Special Collections
layout: dashboard
permalink: /special-collections.html
dashboard:
  data_sources:
    yearly: /kpidata/special-collections.csv
  default_frequency: yearly
  default_tab: chart
  charts:
    - type: bar
      title: Finding Aids Total
      datasets:
        - row_index: 0
    - type: bar
      title: Finding Aids Added/Revised
      datasets:
        - row_index: 1
        - row_index: 2
    - type: line
      title: Archives West Data
      datasets:
        - row_index: 3
    - type: line
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