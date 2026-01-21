---
title: Instruction (Course Based and Workshops)
layout: dashboard
permalink: /instruction.html
dashboard:
  data_sources:
    biannual: /kpidata/instruction.csv
  default_frequency: biannual
  default_tab: chart
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
    - type: line
      title: Workshop Sessions by Type
      datasets:
        - row_index: 23
          color: '#4363d8'
        - row_index: 25
          color: '#3cb44b'
        - row_index: 27
          color: '#911eb4'
        - row_index: 29
          color: '#46f0f0'
        - row_index: 31
          color: '#f032e6'
    - type: line
      title: Workshop Attendees by Type
      datasets:
        - row_index: 24
          color: '#4363d8'
        - row_index: 26
          color: '#3cb44b'
        - row_index: 28
          color: '#911eb4'
        - row_index: 30
          color: '#46f0f0'
        - row_index: 32
          color: '#f032e6'
---