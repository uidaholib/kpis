---
title: Electronic Resources
layout: dashboard
permalink: /electronic-resources.html
dashboard:
  data_sources:
    triannual: /kpidata/electronic-resources.csv
  default_frequency: triannual
  default_tab: chart
  charts:
    - type: line
      title: Database and Journal Usage
      datasets:
        - row_index: 0
        - row_index: 1
    - type: line
      title: E-book and Streaming Video Usage
      datasets:
        - row_index: 2
        - row_index: 3
---