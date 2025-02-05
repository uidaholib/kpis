---
title: Verso
layout: dashboard
permalink: /verso.html
dashboard:
  container_id: versoStats
  data_sources:
    yearly: /assets/verso.csv
  default_frequency: yearly
  show_frequency_toggle: false
  default_tab: chart
  show_table: true
  charts:
    - type: line
      title: Total Projects Growth
      datasets:
        - row_index: 0
    - type: line
      title: Total Items Growth
      datasets:
        - row_index: 1
    - type: bar
      title: Projects Added by Year
      datasets:
        - row_index: 2
    - type: bar
      title: Items Added by Year
      datasets:
        - row_index: 3
---