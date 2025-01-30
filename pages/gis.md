---
title: Geographic Information Systems (GIS)
layout: dashboard
permalink: /gis.html
dashboard:
  container_id: gisUsage
  data_sources:
    yearly: /assets/gis-yearly
    monthly: /assets/gis-monthly
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
      height: 400px
      datasets:
        - label: Unique Users
          row_index: 0
          color: '#0d6efd'
        - label: New Users	
          row_index: 1
          color: '#6610f2'
        - label: Unique Creators	
          row_index: 3
          color: '#0dcaf0'
    - type: line
      title: Item Creation
      height: 400px
      datasets:
        - label: Items Created
          row_index: 2
          color: '#198754'
    - type: line
      title: Item Views
      height: 400px
      datasets:
        - label: Item Views
          row_index: 4
          color: '#fd7e14'
---

