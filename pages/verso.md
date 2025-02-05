---
title: Verso
layout: dashboard
permalink: /verso.html
dashboard:
  container_id: versoStats
  data_sources:
    biannual: /kpidata/verso.csv
  default_frequency: biannual
  show_frequency_toggle: false
  default_tab: chart
  show_table: true
  charts:
    - type: bar
      title: Total Profiles
      datasets:
        - row_index: 0
    - type: line
      title: Research Output Downloads and Views
      datasets:
        - row_index: 1
        - row_index: 2
    - type: bar
      title: Research Assets and Number of Articles
      datasets:
        - row_index: 3
        - row_index: 4
    - type: bar
      title: Non-Article Assets
      datasets:
        - row_index: 5
        - row_index: 6
        - row_index: 7
        - row_index: 8
        - row_index: 9
        - row_index: 10
        - row_index: 11
---