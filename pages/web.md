---
title: Web Analytics
layout: dashboard
permalink: /web-analytics.html
dashboard:
  container_id: webAnalytics
  data_sources:
    yearly: /assets/web-all-yearly
    monthly: /assets/web-all-monthly
  default_frequency: yearly
  show_frequency_toggle: true
  default_tab: chart
  show_table: true
  table_columns:
    - Total users
    - New users
    - Views
    - Views per user
    - Sessions
    - Average session duration
    - Engaged sessions
    - Engagement rate
  charts:
    - type: line
      title: User Growth
      height: 400px
      datasets:
        - label: Total Users
          row_index: 0
          color: '#0d6efd'
        - label: New Users
          row_index: 1
          color: '#6610f2'
    - type: line
      title: Engagement Metrics
      height: 400px
      datasets:
        - label: Views
          row_index: 2
          color: '#198754'
        - label: Sessions
          row_index: 4
          color: '#0dcaf0'
    - type: line
      title: Engagement Rates
      height: 400px
      datasets:
        - label: Views per User
          row_index: 3
          color: '#fd7e14'
        - label: Engagement Rate
          row_index: 7
          color: '#20c997'
---
