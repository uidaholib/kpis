---
title: Fellowships
layout: dashboard
permalink: /fellowships.html
dashboard:
  container_id: fellowshipStats
  data_sources:
    yearly: /assets/fellowships-yearly
  default_frequency: yearly
  show_frequency_toggle: false
  default_tab: chart
  show_table: true
  table_columns:
    - Total Fellowships Awarded
    - Number of Faculty Fellowships Awards
    - Number of Student Fellowships Awards
    - Amount awarded 
    - Student savings
  charts:
    - type: line
      title: Fellowships Awarded
      height: 400px
      datasets:
        - label: Total Fellowships Awarded
          row_index: 0
          color: '#0d6efd'
        - label: Number of Faculty Fellowships Awards	
          row_index: 1
          color: '#6610f2'
        - label: Number of Student Fellowships Awards
          row_index: 2
          color: '#0dcaf0'
    - type: line
      title: Awards and Student Savings
      height: 400px
      datasets:
        - label: Amount awarded
          row_index: 3
          color: 'rgba(13, 110, 253, 0.7)'
        - label: Student savings
          row_index: 4
          color: 'rgba(25, 135, 84, 0.7)'
    - type: bar
      title: Awards and Student Savings
      height: 400px
      datasets:
        - label: Amount awarded
          row_index: 3
          color: 'rgba(13, 110, 253, 0.7)'
        - label: Student savings (Just ThinkOpen)
          row_index: 4
          color: 'rgba(25, 135, 84, 0.7)'
---
