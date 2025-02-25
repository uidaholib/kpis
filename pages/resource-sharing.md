---
title: Resource Sharing (Summit and ILL)
layout: dashboard
permalink: /resource-sharing.html
dashboard:
  data_sources:
    triannual: /kpidata/resource-sharing.csv
  default_frequency: triannual
  default_tab: chart
  charts:
    - type: line
      title: ILL Borrowing and Loaning
      datasets:
        - row_index: 0
        - row_index: 2
    - type: line
      title: ILL Fill Rates
      datasets:
        - row_index: 1
        - row_index: 3
    - type: line
      title: Summit Borrowing and Loaning
      datasets:
        - row_index: 4
        - row_index: 6
    - type: line
      title: Summit Fill Rates
      datasets:
        - row_index: 5
        - row_index: 7
---