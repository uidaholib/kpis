---
title: Special Collections
layout: dashboard
permalink: /special-collections.html
dashboard:
  data_sources:
    biannual: /kpidata/special-collections.csv
  default_frequency: biannual
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
---