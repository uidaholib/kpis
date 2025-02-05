---
title: Research and Reference Assistance
layout: dashboard
permalink: /research-assistance.html
dashboard:
  container_id: researchAssistance
  data_sources:
    triannual: /assets/reference.csv
  default_frequency: triannual
  show_frequency_toggle: false
  default_tab: chart
  show_table: true
  charts:
    - type: bar
      title: Total Interactions
      datasets:
        - row_index: 0
    - type: bar
      title: Interactions by Type
      datasets:
        - row_index: 1
        - row_index: 2
        - row_index: 3
        - row_index: 4
---