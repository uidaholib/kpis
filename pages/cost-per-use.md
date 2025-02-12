---
title: Cost Per Use - Electronic Resources
layout: dashboard
permalink: /cost-per-use.html
dashboard:
  container_id: cost-per-use
  data_sources:
    yearly: /kpidata/cost-per-use.csv
  default_frequency: yearly
  show_frequency_toggle: false
  default_tab: chart
  show_table: true
  charts:
    - type: line
      title: Total Courses Growth
      datasets:
        - row_index: 0
    - type: line
      title: E-Books
      datasets:
        - row_index: 1
    - type: line
      title: Streaming Video (Fiscal Year Data)
      datasets:
        - row_index: 2
---
