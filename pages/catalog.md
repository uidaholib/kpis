---
title: Catalog
layout: dashboard
permalink: /catalog.html
dashboard:
  container_id: catalogStats
  data_sources:
    triannual: /kpidata/catalog.csv
  default_frequency: triannual
  default_tab: chart
  show_table: true
  charts:
    - type: line
      title: Searches and Sign-ins
      datasets:
        - row_index: 0
        - row_index: 1
        - row_index: 2
        - row_index: 3
---