---
title: Electronic Resources
layout: dashboard
permalink: /electronic-resources.html
dashboard:
  container_id: electronicStats
  data_sources:
    triannual: /assets/electronic-resources.csv
  default_frequency: triannual
  show_frequency_toggle: false
  default_tab: chart
  show_table: true
  charts:
    - type: line
      title: Database and Journal Usage
      datasets:
        - row_index: 0
        - row_index: 1
    - type: line
      title: E-book and Streaming Video Usage
      datasets:
        - row_index: 2
        - row_index: 3
---