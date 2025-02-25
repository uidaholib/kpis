---
title: Cost Per Use - Electronic Resources
layout: dashboard
permalink: /cost-per-use.html
dashboard:
  data_sources:
    yearly: /kpidata/cost-per-use.csv
  default_frequency: yearly
  default_tab: chart
  charts:
    - type: line
      title: E-Journals Cost Per Use
      datasets:
        - row_index: 0
    - type: line
      title: E-Books Cost Per Use
      datasets:
        - row_index: 1
    - type: line
      title: Streaming Video Cost Per Use (Fiscal Year Data)
      datasets:
        - row_index: 2
---
