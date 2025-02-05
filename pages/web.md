---
title: Web
layout: dashboard
permalink: /web.html
dashboard:
  container_id: webStats
  data_sources:
    yearly: /assets/web-all-yearly.csv
    monthly: /assets/web-all-monthly.csv
  default_frequency: yearly
  show_frequency_toggle: true
  default_tab: chart
  show_table: true
  charts:
    - type: line
      title: Total Visits Growth
      datasets:
        - row_index: 0
    - type: line
      title: Unique Visitors Growth
      datasets:
        - row_index: 1
    - type: bar
      title: Page Views by Year
      datasets:
        - row_index: 2
    - type: bar
      title: Bounce Rate by Year
      datasets:
        - row_index: 3
---