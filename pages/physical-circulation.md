---
title: Physical Circulation
layout: dashboard
permalink: /physical-circulation.html
dashboard:
  data_sources:
    triannual: /kpidata/circulation.csv
  default_frequency: triannual
  default_tab: chart
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