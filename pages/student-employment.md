---
title: Student Employment
layout: dashboard
permalink: /student-employment.html
dashboard:
  data_sources:
    triannual: /kpidata/student-employment.csv
  default_frequency: triannual
  default_tab: chart
  charts:
    - type: line
      title: Student Workers
      datasets:
        - row_index: 0
    - type: line
      title: Student Hours
      datasets:
        - row_index: 1
    - type: line
      title: Student Wages
      datasets:
        - row_index: 2
---