---
title: Geographic Information Systems (GIS)
layout: dashboard
permalink: /gis.html
dashboard:
  container_id: gisUsage
  data_sources:
    yearly: /assets/gis-yearly.csv
    monthly: /assets/gis-monthly.csv
  default_frequency: yearly
  show_frequency_toggle: true
  default_tab: chart
  show_table: true
  table_columns:
    - Unique Users	
    - New Users	
    - Items Created	
    - Unique Creators	
    - Item Views
  charts:
    - type: line
      title: User Growth
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

