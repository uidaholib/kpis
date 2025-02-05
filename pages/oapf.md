---
title: Open Publishing
layout: dashboard
permalink: /open-publishing.html
dashboard:
  container_id: oapfStats
  data_sources:
    biannual: /kpidata/oapf.csv
  default_frequency: biannual
  show_frequency_toggle: false
  default_tab: chart
  show_table: true
  charts:
    - type: line
      title: Funded Articles and Departments Impacted
      datasets:
        - row_index: 0
        - row_index: 2
    - type: line
      title: Total Amount Expended
      datasets:
        - row_index: 1
---