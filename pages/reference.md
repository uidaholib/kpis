---
title: Research and Reference Assistance
layout: dashboard
permalink: /research-assistance.html
dashboard:
  data_sources:
    triannual: /kpidata/reference-by-term.csv
    yearly: /kpidata/reference-yearly.csv
  default_frequency: yearly
  default_tab: chart
  charts:
    - type: line
      title: Total Interactions
      datasets:
        - row_index: 0
    - type: line
      title: Interactions by Type
      datasets:
        - row_index: 1
        - row_index: 2
        - row_index: 3
        - row_index: 4
---