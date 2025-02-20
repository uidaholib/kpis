---
title: Course Reserves
layout: dashboard
permalink: /course-reserves.html
dashboard:
  container_id: courseReserves
  data_sources:
    triannual: /kpidata/course-reserves.csv
  default_frequency: triannual
  show_frequency_toggle: false
  default_tab: chart
  show_table: true
  table_columns:
    - Total Courses
    - Total Items
    - Courses Added
    - Items Added
  charts:
    - type: line
      title: Total Courses 
      datasets:
        - row_index: 0
    - type: line
      title: Total Items 
      datasets:
        - row_index: 1
    - type: bar
      title: Courses Added by Year
      datasets:
        - row_index: 2
    - type: bar
      title: Items Added by Year
      datasets:
        - row_index: 3
    - type: line
      title: Estimated Student Savings
      datasets:
        - row_index: 4
---
