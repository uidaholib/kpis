#!/usr/bin/env python3
"""
Script to transpose and reformat web analytics data and add it to web-all-monthly.csv
Configurable for any date range and folder of CSV exports.
"""

import csv
import pandas as pd
import os
import glob

# ============= CONFIGURATION =============
# Define your data parameters here:

# Year for the data (e.g., 2025, 2026, etc.)
DATA_YEAR = 2025

# Starting month number (1=January, 2=February, etc.)
START_MONTH = 1

# Ending month number (1=January, 2=February, etc.) 
END_MONTH = 5

# Subfolder name within kpidata/webexports/ containing the CSV files
EXPORT_FOLDER = "Jan_May2025"

# Pattern to match the "All Library Web Properties" file (for overall totals)
ALL_PROPERTIES_PATTERN = "*All Library Web Properties*"

# ========================================

def seconds_to_duration(seconds):
    """Convert seconds to MM:SS format"""
    minutes = int(seconds // 60)
    secs = int(seconds % 60)
    return f"{minutes}:{secs:02d}"

def format_percentage(decimal_value):
    """Convert decimal to percentage format"""
    return f"{decimal_value * 100:.2f}%"

def get_month_name(month_number):
    """Convert month number to month name"""
    months = ['', 'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December']
    return months[month_number]

def find_all_properties_file(folder_path):
    """Find the All Library Web Properties file in the folder"""
    pattern = os.path.join(folder_path, ALL_PROPERTIES_PATTERN)
    matching_files = glob.glob(pattern)
    if matching_files:
        return matching_files[0]
    else:
        raise FileNotFoundError(f"No file matching pattern '{ALL_PROPERTIES_PATTERN}' found in {folder_path}")

# Set up file paths
base_dir = "/Users/devinbecker/Documents/GitHub/kpis"
export_folder_path = os.path.join(base_dir, "kpidata", "webexports", EXPORT_FOLDER)
existing_data_file = os.path.join(base_dir, "kpidata", "web-all-monthly.csv")

# Find the All Library Web Properties file
new_data_file = find_all_properties_file(export_folder_path)

# Read new data
print(f"Reading data from: {new_data_file}")
new_df = pd.read_csv(new_data_file)
print("New data:")
print(new_df)

# Read existing data
existing_df = pd.read_csv(existing_data_file, index_col=0)
print("\nExisting data columns:")
print(existing_df.columns.tolist())

# Create the new columns for the specified date range
new_columns = []
for month_num in range(START_MONTH, END_MONTH + 1):
    month_name = get_month_name(month_num)
    column_name = f"{month_name} {DATA_YEAR}"
    new_columns.append(column_name)

print(f"\nProcessing months {START_MONTH} to {END_MONTH} for year {DATA_YEAR}")
print(f"New columns to add: {new_columns}")

# Initialize the new data dictionary
new_data = {}

# Handle potential column name issues (backtick prefix)
month_col = 'Month' if 'Month' in new_df.columns else new_df.columns[0]
print(f"Using month column: '{month_col}'")

# Process each metric
for i, column_name in enumerate(new_columns):
    month_num = START_MONTH + i  # Calculate actual month number
    
    # Find the row for this month
    month_rows = new_df[new_df[month_col] == month_num]
    if month_rows.empty:
        print(f"Warning: No data found for month {month_num}")
        continue
        
    row_data = month_rows.iloc[0]
    
    new_data[column_name] = {
        'Total users': int(row_data['Total users']),
        'New users': int(row_data['New users']),
        'Views': int(row_data['Views']),
        'Views per user': round(row_data['Views per user'], 2),
        'Sessions': int(row_data['Sessions']),
        'Average session duration': seconds_to_duration(row_data['Average session duration']),
        'Engaged sessions': int(row_data['Engaged sessions']),
        'Engagement rate': format_percentage(row_data['Engagement rate'])
    }

print("\nProcessed new data:")
for column_name, data in new_data.items():
    print(f"{column_name}: {data}")

# Add new columns to existing dataframe
for column_name in new_columns:
    if column_name in new_data:
        values = []
        for metric in existing_df.index:
            values.append(new_data[column_name][metric])
        existing_df[column_name] = values
    else:
        print(f"Warning: No data processed for {column_name}")

print(f"\nUpdated dataframe shape: {existing_df.shape}")
print(f"New columns added: {new_columns}")

# Save the updated data
existing_df.to_csv(existing_data_file)
print(f"\nData successfully saved to {existing_data_file}")
print(f"Processing complete!")
print(f"Summary: Added {len(new_columns)} months of data from {get_month_name(START_MONTH)} to {get_month_name(END_MONTH)} {DATA_YEAR}")
