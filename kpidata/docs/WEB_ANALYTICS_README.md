# Web Analytics Data Processing Scripts

This repository contains two Python scripts for processing and importing web analytics data exports into the KPI tracking system.

## Scripts Overview

### 1. `process_web_data.py`
Processes the "All Library Web Properties" CSV file and adds the data to `web-all-monthly.csv`.

### 2. `process_all_web_properties.py` 
Processes all web property CSV files in a folder and adds the data to `web-properties.csv`.

## Configuration

Both scripts use the same configuration variables at the top of each file. Simply edit these values before running:

```python
# ============= CONFIGURATION =============
# Year for the data (e.g., 2025, 2026, etc.)
DATA_YEAR = 2025

# Starting month number (1=January, 2=February, etc.)
START_MONTH = 1

# Ending month number (1=January, 2=February, etc.) 
END_MONTH = 5

# Subfolder name within kpidata/webexports/ containing the CSV files
EXPORT_FOLDER = "Jan_May2025"
# ========================================
```

## Month Number Convention

The scripts use this month numbering system:
- 1 = January
- 2 = February  
- 3 = March
- 4 = April
- 5 = May
- 6 = June
- 7 = July
- 8 = August
- 9 = September
- 10 = October
- 11 = November
- 12 = December

## Usage Examples

### Example 1: Processing January-May 2025 data
```python
DATA_YEAR = 2025
START_MONTH = 1    # January
END_MONTH = 5      # May
EXPORT_FOLDER = "Jan_May2025"
```

### Example 2: Processing June-August 2025 data
```python
DATA_YEAR = 2025
START_MONTH = 6    # June
END_MONTH = 8      # August
EXPORT_FOLDER = "Jun_Aug2025"
```

### Example 3: Processing single month (December 2025)
```python
DATA_YEAR = 2025
START_MONTH = 12   # December
END_MONTH = 12     # December
EXPORT_FOLDER = "Dec2025"
```

## File Structure Requirements

The scripts expect CSV files to be placed in:
```
kpidata/webexports/[EXPORT_FOLDER]/
```

For example, with `EXPORT_FOLDER = "Jan_May2025"`, place files in:
```
kpidata/webexports/Jan_May2025/
```

## File Naming Patterns

The scripts automatically find CSV files using these patterns:
- `*All Library Web Properties*` → Overall totals
- `*Main Library Website*` → Main website data
- `*Catalog*` → Catalog/Primo data
- `*Digital Properties*` → Digital collections data
- `*Spec Properties*` → Special collections data
- `*Verso*` → Verso platform data
- `*GIS Properties*` → GIS/InsideIdaho data
- `*Pressbooks*` → Pressbooks data
- `*Springshare*` → LibGuides/LibCal/LibAnswers data

The exact filenames can vary (e.g., different suffixes) as long as they contain these key terms.

## Data Format Requirements

CSV files must contain these columns:
- `Month` (or `'Month` with backtick) - containing month numbers (1-12)
- `Total users`
- `New users`
- `Views`
- `Views per user`
- `Sessions`
- `Average session duration` (in seconds)
- `Engaged sessions`
- `Engagement rate` (as decimal, e.g., 0.48 for 48%)

## Output

### `process_web_data.py` output:
- Updates `kpidata/web-all-monthly.csv`
- Adds columns like "January 2025", "February 2025", etc.

### `process_all_web_properties.py` output:
- Updates `kpidata/web-properties.csv`
- Adds columns for all web properties with the same date format

## Data Transformations

The scripts automatically handle:
- **Transposing**: Month rows → Month columns
- **Percentage formatting**: 0.48 → 48.05%
- **Duration formatting**: 237.75 seconds → 3:57
- **Rounding**: Views per user to 2 decimal places
- **Type conversion**: Appropriate integer/float formatting

## Running the Scripts

1. Edit the configuration variables at the top of the script
2. Ensure your CSV files are in the correct folder
3. Run the script:

```bash
python3 process_web_data.py
# or
python3 process_all_web_properties.py
```

## Dependencies

- pandas
- Python 3.x

Install pandas if needed:
```bash
pip3 install pandas
```

## Troubleshooting

- **"No files found"**: Check that CSV files are in the correct folder and match the expected naming patterns
- **"No data found for month X"**: Verify that your CSV contains the expected month numbers
- **Column errors**: Check that CSV files have the required column names

## Future Usage

When you receive new CSV exports:
1. Create a new folder in `kpidata/webexports/` (e.g., `Jun_Aug2025`)
2. Place the CSV files in that folder
3. Update the configuration variables in the scripts
4. Run the scripts to import the new data
