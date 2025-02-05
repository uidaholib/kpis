---
title: Open Access Publishing Fund (OAPF)
layout: dashboard
permalink: /oapf.html
dashboard:
  container_id: oapfStats
  data_sources:
    yearly: /assets/oapf.csv
  default_frequency: yearly
  show_frequency_toggle: false
  default_tab: chart
  show_table: true
  table_columns:
    - Total Applications
    - Total Funded
    - Applications Approved
    - Amount Funded
  charts:
    - type: line
      title: Total Applications Growth
      datasets:
        - row_index: 0
    - type: line
      title: Total Funded Growth
      datasets:
        - row_index: 1
    - type: bar
      title: Applications Approved by Year
      datasets:
        - row_index: 2
    - type: bar
      title: Amount Funded by Year
      datasets:
        - row_index: 3
---