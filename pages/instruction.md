---
title: Instruction (Course Based and Workshops)
layout: dashboard
permalink: /instruction.html
dashboard:
  container_id: instructionStats
  data_sources:
    biannual: /kpidata/instruction.csv
  default_frequency: biannual
  default_tab: chart
  show_table: true
  charts:
    - type: line
      title: Sessions Overview
      datasets:
        - row_index: 0
        - row_index: 2
        - row_index: 21
    - type: line
      title: Attendees Overview
      datasets:
        - row_index: 1
        - row_index: 3
        - row_index: 4
        - row_index: 22
    - type: line
      title: Course-based Sessions by Type
      datasets:
        - row_index: 13
        - row_index: 15
        - row_index: 17
        - row_index: 19
    - type: line
      title: Course-based Attendees by Type
      datasets:
        - row_index: 14
        - row_index: 16
        - row_index: 18
        - row_index: 20
      title: Workshop Sessions by Type
      datasets:
        - row_index: 23
        - row_index: 25
        - row_index: 27
        - row_index: 29
        - row_index: 31
    - type: line
      title: Workshop Attendees by Type
      datasets:
        - row_index: 24
        - row_index: 26
        - row_index: 28
        - row_index: 30
        - row_index: 32
---