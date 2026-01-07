#!/usr/bin/env python3
"""
Script to process all web analytics CSV files and add transposed/reformatted data to web-properties.csv
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
START_MONTH = 6

# Ending month number (1=January, 2=February, etc.) 
END_MONTH = 12

# Subfolder name within kpidata/webexports/ containing the CSV files
EXPORT_FOLDER = "Jun_Dec2025"

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

def get_file_patterns_to_prefixes():
    """Map file patterns to their corresponding row prefixes in web-properties.csv"""
    return {
        '*All Library Web Properties*': 'All',
        '*Main Library Website*': 'Main',
        '*Catalog*': 'Catalog',
        '*Digital Properties*': 'Digital',
        '*Spec Properties*': 'Spec',
        '*Verso*': 'VERSO',
        '*GIS Properties*': 'GIS',
        '*Pressbooks*': 'Pressbooks',
        '*Springshare*': 'Springshare'
    }

def process_csv_file(file_path, start_month, end_month, data_year):
    """Process a single CSV file and return formatted data for specified month range"""
    print(f"Processing: {os.path.basename(file_path)}")
    
    try:
        # Read the CSV file
        df = pd.read_csv(file_path)
        
        # Handle potential column name issues (backtick prefix)
        month_col = 'Month' if 'Month' in df.columns else df.columns[0]
        
        print(f"  Columns: {df.columns.tolist()}")
        print(f"  Using month column: '{month_col}'")
        
        # Create the new columns for the specified date range
        new_columns = []
        for month_num in range(start_month, end_month + 1):
            month_name = get_month_name(month_num)
            column_name = f"{month_name} {data_year}"
            new_columns.append(column_name)
        
        # Initialize the processed data dictionary
        processed_data = {}
        
        # Process each month
        for i, column_name in enumerate(new_columns):
            month_num = start_month + i  # Calculate actual month number
            
            # Find the row for this month
            month_rows = df[df[month_col] == month_num]
            if month_rows.empty:
                print(f"  Warning: No data found for month {month_num}")
                continue
                
            row_data = month_rows.iloc[0]
            
            processed_data[column_name] = {
                'Total users': int(row_data['Total users']),
                'New users': int(row_data['New users']),
                'Views': int(row_data['Views']),
                'Views per user': round(row_data['Views per user'], 2),
                'Sessions': int(row_data['Sessions']),
                'Average session duration': seconds_to_duration(row_data['Average session duration']),
                'Engaged sessions': int(row_data['Engaged sessions']),
                'Engagement rate': format_percentage(row_data['Engagement rate'])
            }
        
        print(f"  Successfully processed {len(processed_data)} months")
        return processed_data
        
    except Exception as e:
        print(f"  Error processing file: {e}")
        return {}

def main():
    # Set up file paths
    base_dir = "/Users/devinbecker/Documents/GitHub/kpis"
    input_folder = os.path.join(base_dir, "kpidata", "webexports", EXPORT_FOLDER)
    output_file = os.path.join(base_dir, "kpidata", "web-properties.csv")
    
    print(f"Configuration:")
    print(f"  Year: {DATA_YEAR}")
    print(f"  Month range: {START_MONTH} ({get_month_name(START_MONTH)}) to {END_MONTH} ({get_month_name(END_MONTH)})")
    print(f"  Export folder: {EXPORT_FOLDER}")
    print(f"  Input folder: {input_folder}")
    print(f"  Output file: {output_file}")
    
    # Verify input folder exists
    if not os.path.exists(input_folder):
        print(f"Error: Input folder does not exist: {input_folder}")
        return
    
    # Get file patterns and prefixes
    patterns_to_prefixes = get_file_patterns_to_prefixes()
    
    # Read the existing web-properties.csv
    print(f"\nReading existing web-properties.csv...")
    df = pd.read_csv(output_file, index_col=0)
    print(f"Current shape: {df.shape}")
    print(f"Current columns: {df.columns.tolist()}")
    
    # Process each CSV file type in the input folder
    all_processed_data = {}
    
    for pattern, row_prefix in patterns_to_prefixes.items():
        matching_files = glob.glob(os.path.join(input_folder, pattern))
        
        if matching_files:
            file_path = matching_files[0]  # Take first match
            processed_data = process_csv_file(file_path, START_MONTH, END_MONTH, DATA_YEAR)
            if processed_data:
                all_processed_data[row_prefix] = processed_data
        else:
            print(f"Warning: No files found matching pattern: {pattern}")
    
    print(f"\nSuccessfully processed {len(all_processed_data)} property types")
    
    # Create the new columns for the specified date range
    new_columns = []
    for month_num in range(START_MONTH, END_MONTH + 1):
        month_name = get_month_name(month_num)
        column_name = f"{month_name} {DATA_YEAR}"
        new_columns.append(column_name)
    
    # Add new columns to the dataframe
    for column_name in new_columns:
        print(f"\nAdding column: {column_name}")
        
        # Create new column data
        column_data = []
        
        for index in df.index:
            # Skip empty/NaN indices
            if pd.isna(index) or index == '':
                column_data.append('')
                continue
                
            # Convert to string to handle any type issues
            index_str = str(index)
            
            # Skip rows that don't contain data (header rows or empty rows)
            if ' - ' not in index_str:
                column_data.append('')
                print(f"  {index_str}: [skipping header/empty row]")
                continue
            
            # Extract the row prefix (e.g., "All" from "All - Total users")
            row_prefix = index_str.split(' - ')[0]
            
            # Extract the metric name (e.g., "Total users" from "All - Total users")
            metric = index_str.split(' - ', 1)[1]
            
            if row_prefix in all_processed_data and column_name in all_processed_data[row_prefix]:
                if metric in all_processed_data[row_prefix][column_name]:
                    value = all_processed_data[row_prefix][column_name][metric]
                    column_data.append(value)
                    print(f"  {index_str}: {value}")
                else:
                    column_data.append('')
                    print(f"  {index_str}: [metric not found]")
            else:
                column_data.append('')
                print(f"  {index_str}: [no data for {row_prefix}]")
        
        df[column_name] = column_data
    
    print(f"\nUpdated dataframe shape: {df.shape}")
    
    # Save the updated data
    df.to_csv(output_file)
    print(f"Data successfully saved to {output_file}")
    
    # Print summary
    print(f"\nSummary:")
    print(f"- Processed {len(all_processed_data)} property types")
    print(f"- Added {len(new_columns)} new columns ({get_month_name(START_MONTH)} to {get_month_name(END_MONTH)} {DATA_YEAR})")
    print(f"- Updated {len(df)} rows")
    print(f"- Processing complete!")

if __name__ == "__main__":
    main()
