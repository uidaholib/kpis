---
title: Course Reserves
layout: dashboard
permalink: /course-reserves.html
dashboard:
  container_id: reservesAnalytics
  data_sources:
    triannual: /assets/course-reserves
  default_frequency: triannual
  show_frequency_toggle: true
  default_tab: chart
  show_table: true
  table_columns:
    - Course sections using reserves
    - Students using reserves
    - Physical reserve circulation
    - Electronic reserves
    - Estimated student savings from Reserves
  charts:
    - type: line
      title: Course and Student Usage
      height: 400px
      datasets:
        - label: Course Sections
          row_index: 0
          color: '#0d6efd'
        - label: Students
          row_index: 1
          color: '#6610f2'
    - type: line
      title: Reserve Items Usage
      height: 400px
      datasets:
        - label: Physical Items
          row_index: 2
          color: '#198754'
        - label: Electronic Items
          row_index: 3
          color: '#0dcaf0'
    - type: bar
      title: Estimated Student Savings
      height: 400px
      datasets:
        - label: Savings
          row_index: 4
          color: '#20c997'
---
