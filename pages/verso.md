---
title: VERSO (Research Information Management)
layout: dashboard
permalink: /verso.html
dashboard:
  container_id: versoStats
  data_sources:
    biannual: /assets/verso
  default_frequency: biannual
  show_frequency_toggle: true
  default_tab: chart
  show_table: true
  table_columns:
    - Profiles
    - Research Output Downloads
    - Research Output Views
    - Research Assets Total
    - articles
    - books
    - book chapters
    - conference paper
    - dataset
    - dissertation
    - thesis
    - other
  charts:
    - type: line
      title: Usage
      height: 400px
      datasets:
        - label: Research Output Downloads
          row_index: 1
          color: '#0d6efd'
        - label: Research Output Views
          row_index: 2
          color: '#6610f2'
        - label: Research Assets Total
          row_index: 3
          color: '#rgba(25, 135, 84, 0.7)'
        - label: Journal Articles
          row_index: 4
          color: 'rgba(135, 60, 25, 0.7)'
    - type: line
      title: Non-Article Research Assets
      height: 400px
      datasets:           
        - label: books
          row_index: 5
          color: 'rgba(29, 25, 135, 0.7)'
        - label: book chapters
          row_index: 6
          color: 'rgba(135, 25, 115, 0.7)'
        - label: conference paper
          row_index: 7
          color: 'rgba(62, 135, 25, 0.7)'
        - label: dataset
          row_index: 8
          color: 'rgba(135, 54, 25, 0.7)'
        - label: dissertation
          row_index: 9
          color: 'rgba(25, 135, 120, 0.7)'
        - label: thesis
          row_index: 10
          color: 'rgba(118, 135, 25, 0.7)'
        - label: other
          row_index: 11
          color: 'rgba(161, 82, 215, 0.7)'
    - type: bar
      title: Profiles
      height: 400px
      datasets:
        - label: Profiles
          row_index: 0
          color: '#20c997'
---