---
title: Physical Circulation
layout: dashboard
permalink: /physical-circulation.html
dashboard:
  container_id: electronicStats
  data_sources:
    triannual: /assets/circulation.csv
  default_frequency: triannual
  show_frequency_toggle: false
  default_tab: chart
  show_table: true
  charts:
    - type: line
      title: Print Checkouts and Renewals
      datasets:
        - row_index: 0
        - row_index: 1
    - type: line
      title: Technology Check Outs
      datasets:
        - row_index: 2
---