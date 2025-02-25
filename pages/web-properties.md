---
title: Web Stats Across Properties 
layout: dashboard
permalink: /web-properties.html
keepChartColorsSame: true
dashboard:
  data_sources:
    monthly: /kpidata/web-properties.csv
  default_frequency: monthly
  default_tab: chart
  charts:
    - type: line
      title: Total Users
      datasets:
        - row_index: 0
        - row_index: 10
        - row_index: 20
        - row_index: 30
        - row_index: 40
        - row_index: 50
        - row_index: 60
        - row_index: 70
        - row_index: 80
    - type: line
      title: Views
      datasets:
        - row_index: 2
        - row_index: 12
        - row_index: 22
        - row_index: 32
        - row_index: 42
        - row_index: 52
        - row_index: 62
        - row_index: 72
        - row_index: 82
    - type: line
      title: Sessions
      datasets:
        - row_index: 4
        - row_index: 14
        - row_index: 24
        - row_index: 34
        - row_index: 46
        - row_index: 54
        - row_index: 64
        - row_index: 74
        - row_index: 84
    - type: line
      title: Engagement Rates
      datasets:
        - row_index: 7
        - row_index: 17
        - row_index: 27
        - row_index: 37
        - row_index: 47
        - row_index: 57
        - row_index: 67
        - row_index: 77
        - row_index: 87
    - type: line
      title: Views Per User
      datasets:
        - row_index: 3
        - row_index: 13 
        - row_index: 23
        - row_index: 33
        - row_index: 43
        - row_index: 53
        - row_index: 63
        - row_index: 73
        - row_index: 83
---