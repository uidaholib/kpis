---
title: Fellowships
layout: dashboard
permalink: /fellowships.html
dashboard:
  data_sources:
    yearly: /kpidata/fellowships.csv
  default_frequency: yearly
  default_tab: chart
  charts:
    - type: line
      title: Fellowships Awarded
      datasets:
        - row_index: 0
        - row_index: 1
        - row_index: 2
    - type: bar
      title: Awards and Student Savings
      datasets:
        - row_index: 3
        - row_index: 4
---
