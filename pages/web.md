---
title: Web - All Web Properties Combined
layout: dashboard
permalink: /web.html
dashboard:
  data_sources:
    yearly: /kpidata/web-all-yearly.csv
    monthly: /kpidata/web-all-monthly.csv
  default_frequency: monthly
  default_tab: chart
  charts:
    - type: line
      title: Total Users and New Users
      datasets:
        - row_index: 0
        - row_index: 1
    - type: line
      title: Views and Sessions
      datasets:
        - row_index: 2
        - row_index: 4
        - row_index: 6
    - type: line
      title: Engagement Rates
      datasets:
        - row_index: 3
        - row_index: 7
---
