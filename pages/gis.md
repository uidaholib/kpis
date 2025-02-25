---
title: Geographic Information Systems (GIS)
layout: dashboard
permalink: /gis.html
dashboard:
  data_sources:
    yearly: /kpidata/gis-yearly.csv
    monthly: /kpidata/gis-monthly.csv
  default_frequency: yearly
  default_tab: chart
  table_columns:
    - Unique Users	
    - New Users	
    - Items Created	
    - Unique Creators	
    - Item Views
  charts:
    - type: line
      title: Users and Creators
      datasets:
        - row_index: 0
        - row_index: 1
        - row_index: 3
    - type: line
      title: Item Creation
      datasets:
        - row_index: 2
    - type: line
      title: Item Views
      datasets:
        - row_index: 4
---

