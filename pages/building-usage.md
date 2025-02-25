---
title: Building Usage
layout: dashboard
permalink: /building-usage.html
dashboard:
  data_sources:
    triannual: /kpidata/building-usage.csv
  default_frequency: triannual
  default_tab: chart
  charts:
    - type: line
      title: Gate Counts
      datasets:
        - row_index: 0
    - type: line
      title: Room/Services Reservations
      datasets:
        - row_index: 1
        - row_index: 2
        - row_index: 3
        - row_index: 4
        - row_index: 5
---