---
title: Building Usage
layout: dashboard
permalink: /building-usage.html
dashboard:
  container_id: buildingUsage
  data_sources:
    triannual: /kpidata/building-usage.csv
  default_frequency: triannual
  show_frequency_toggle: false
  default_tab: chart
  show_table: true
  charts:
    - type: line
      title: Gate Counts
      datasets:
        - row_index: 0
    - type: line
      title: Room/MILL Reservations
      datasets:
        - row_index: 1
        - row_index: 2
        - row_index: 3
        - row_index: 4
        - row_index: 5
---