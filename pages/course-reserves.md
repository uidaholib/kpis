---
title: Course Reserves
layout: dashboard
permalink: /course-reserves.html
dashboard:
  container_id: courseReserves
  data_sources:
    triannual: /kpidata/course-reserves.csv
  default_frequency: triannual
  default_tab: chart
  show_table: true
  charts:
    - type: line
      title: Courses Sections Using Reserves
      datasets:
        - row_index: 0
    - type: line
      title: Students Using Reserves
      datasets:
        - row_index: 1
    - type: bar
      title: Physical Reserve Item Circulations
      datasets:
        - row_index: 2
    - type: bar
      title: Electronic Reserve Item Circulation
      datasets:
        - row_index: 3
    - type: line
      title: Estimated Student Savings
      datasets:
        - row_index: 4
---
