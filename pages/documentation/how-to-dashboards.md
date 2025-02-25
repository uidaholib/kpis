---
title: How To Edit and Create New Dashboards
permalink: /docs/dashboards.html
layout: page-narrow
---

# How To Edit and Create New Dashboards

## Contents

- [Dashboard Configuration](#dashboard-configuration)
- [Advanced Dashboard Options](#advanced-dashboard-options)


## Dashboard Configuration

Each dashboard page in the KPIs system is configured using a YAML front matter block in a Markdown file. Here's how to set up or modify a dashboard page:

### Basic Structure

```yaml
---
title: Your Dashboard Title
layout: dashboard
permalink: /your-page-url.html
dashboard:
  data_sources:
    frequency: /path/to/data.csv
  default_frequency: frequency
  default_tab: chart
  charts:
    - type: line|bar
      title: Chart Title
      datasets:
        - row_index: 0
---
```

### Key Components

1. **Title**: The name that appears at the top of the dashboard

2. **Data Source**:
   - Located under `data_sources`
   - Specify the frequency (yearly, monthly, triannual, biannual) 
   - Point to the CSV file in the `kpidata` directory

3. **Charts**:
   - Each chart requires:
     - `type`: Either `line` or `bar`
     - `title`: The chart's display title
     - `datasets`: Array of row indexes from your CSV data to display

### Basic Example

Here's a complete example of a building usage dashboard:

```yaml
---
title: Building Usage
layout: dashboard
permalink: /building-usage.html
dashboard:
  data_sources:
    triannual: /kpidata/building-usage.csv
  default_frequency: triannual
  default_tab: chart
  charts:
    - type: line
      title: Gate Counts
      datasets:
        - row_index: 0
---
```

**Note**: The row indexes in `datasets` correspond to the rows in your CSV file, starting at index 0.

{:.border-top .mt-5 .pt-4}
## Advanced Dashboard Options

The dashboard configuration supports several additional settings in the front matter for more complex use cases:

### Color Consistency Across Charts

The `keepChartColorsSame` option maintains consistent colors across multiple charts on the same page. This is particularly useful when comparing related metrics across different visualizations:

```yaml
---
title: Your Dashboard
keepChartColorsSame: true
dashboard:
  ...
```

When enabled, data series with the same index will use the same color across all charts, making it easier to track metrics for a specific property or category.

### Display Options

You can control how the dashboard initially appears to users:

1. **default_frequency**: Controls which data frequency tab is selected by default
```yaml
dashboard:
  default_frequency: monthly  # Options: yearly, monthly, triannual, biannual
```

2. **default_tab**: Sets the initial view when loading the dashboard
```yaml
dashboard:
  default_tab: chart  # Options: chart, table
```

### Example with Advanced Options

Here's an example showing these options in use:

```yaml
---
title: Web Stats Across Properties
layout: dashboard
permalink: /web-properties.html
keepChartColorsSame: true
dashboard:
  data_sources:
    monthly: /kpidata/web-properties.csv
  default_frequency: monthly
  default_tab: chart
  charts:
    - type: line
      title: Total Users
      datasets:
        - row_index: 0
        - row_index: 10
        - row_index: 20
---
```

In this example, the chart colors will remain consistent across different charts, the monthly data will be shown by default, and the page will open in chart view rather than table view.