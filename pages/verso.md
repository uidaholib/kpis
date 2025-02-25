---
title: Verso
layout: dashboard
permalink: /verso.html
dashboard:
  data_sources:
    triannual: /kpidata/verso-by-term.csv
    yearly: /kpidata/verso-yearly.csv
  default_frequency: triannual
  default_tab: chart
  charts:
    - type: line
      title: Total Profiles
      datasets:
        - row_index: 0
    - type: line
      title: Research Output Downloads and Views
      datasets:
        - row_index: 1
        - row_index: 2
    - type: bar
      title: Research Assets and Number of Articles Added
      datasets:
        - row_index: 3
        - row_index: 4
    - type: line
      title: Non-Article Assets Added
      datasets:
        - row_index: 5
        - row_index: 6
        - row_index: 7
        - row_index: 8
        - row_index: 9
        - row_index: 10
        - row_index: 11
---