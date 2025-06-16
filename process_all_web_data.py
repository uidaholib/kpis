#!/usr/bin/env python3
"""
Script to process all web analytics CSV files from Jan-May 2025 exports
and add the transposed/reformatted data to web-properties.csv
"""

import csv
import pandas as pd
import os
import glob

def seconds_to_duration(seconds):
    """Convert seconds to MM:SS format"""
    minutes = int(seconds // 60)
    secs = int(seconds % 60)
    return f"{minutes}:{secs:02d}"

def format_percentage(decimal_value):
    """Convert decimal to percentage format"""
    return f"{decimal_value * 100:.2f}%"

def get_file_mapping():
    """Map CSV filenames to their corresponding row prefixes in web-properties.csv"""
    return {
        'All Library Web Properties_Copy of Untitled Page_Time series (11).csv': 'All',
        'Main Library Website (www.lib.uidaho.edu)_Copy of Untitled Page_Time series (3).csv': 'Main',
        'Catalog (search.lib.uidaho.edu)_Copy of Untitled Page_Time series (3).csv': 'Catalog',
        'Digital Properties (www.lib.uidaho.edu_digital_ + cdil.lib.uidaho.edu)_Copy of Untitled Page_Time series (2).csv': 'Digital',
        'Spec Properties (_special-collections_ + harvester.lib.uidaho.edu) _Copy of Untitled Page_Time series (2).csv': 'Spec',
        'Verso (verso.uidaho.edu)_Copy of Untitled Page_Time series (3).csv': 'VERSO',
        'GIS Properties (insideidaho.org, +++) _Copy of Untitled Page_Time series (2).csv': 'GIS',
        'Pressbooks (uidaho.pressbooks.pub)_Copy of Untitled Page_Time series (2).csv': 'Pressbooks',
        'Springshare Properties (libguides_libcal_libanswers)_Copy of Untitled Page_Time series (2).csv': 'Springshare'
    }

def process_csv_file(file_path):
    """Process a single CSV file and return formatted data for 2025 months"""
    print(f"Processing: {os.path.basename(file_path)}")
    
    try:
        # Read the CSV file
        df = pd.read_csv(file_path)
        
        # Handle potential column name issues (backtick prefix)
        month_col = 'Month' if 'Month' in df.columns else df.columns[0]
        
        print(f"  Columns: {df.columns.tolist()}")
        print(f"  Using month column: '{month_col}'")
        
        # Create the new columns for 2025 data
        new_columns = ['January 2025', 'February 2025', 'March 2025', 'April 2025', 'May 2025']
        
        # Initialize the processed data dictionary
        processed_data = {}
        
        # Process each month
        for i, month in enumerate(new_columns):
            month_num = i + 1  # Month 1 = January, etc.
            
            # Find the row for this month
            month_rows = df[df[month_col] == month_num]
            if month_rows.empty:
                print(f"  Warning: No data found for month {month_num}")
                continue
                
            row_data = month_rows.iloc[0]
            
            processed_data[month] = {
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
    # Define paths
    input_folder = "/Users/devinbecker/Documents/GitHub/kpis/kpidata/webexports/Jan_May2025"
    output_file = "/Users/devinbecker/Documents/GitHub/kpis/kpidata/web-properties.csv"
    
    # Get file mapping
    file_mapping = get_file_mapping()
    
    # Read the existing web-properties.csv
    print("Reading existing web-properties.csv...")
    df = pd.read_csv(output_file, index_col=0)
    print(f"Current shape: {df.shape}")
    print(f"Current columns: {df.columns.tolist()}")
    
    # Process each CSV file in the input folder
    all_processed_data = {}
    
    # Instead of using exact filenames, find files by pattern
    patterns_to_prefixes = {
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
    
    for pattern, row_prefix in patterns_to_prefixes.items():
        matching_files = glob.glob(os.path.join(input_folder, pattern))
        
        if matching_files:
            file_path = matching_files[0]  # Take first match
            processed_data = process_csv_file(file_path)
            if processed_data:
                all_processed_data[row_prefix] = processed_data
        else:
            print(f"Warning: No files found matching pattern: {pattern}")
    
    print(f"\nSuccessfully processed {len(all_processed_data)} property types")
    
    # Add new columns to the dataframe
    new_columns = ['January 2025', 'February 2025', 'March 2025', 'April 2025', 'May 2025']
    
    for month in new_columns:
        print(f"\nAdding column: {month}")
        
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
            
            if row_prefix in all_processed_data and month in all_processed_data[row_prefix]:
                if metric in all_processed_data[row_prefix][month]:
                    value = all_processed_data[row_prefix][month][metric]
                    column_data.append(value)
                    print(f"  {index}: {value}")
                else:
                    column_data.append('')
                    print(f"  {index}: [metric not found]")
            else:
                column_data.append('')
                print(f"  {index}: [no data for {row_prefix}]")
        
        df[month] = column_data
    
    print(f"\nUpdated dataframe shape: {df.shape}")
    
    # Save the updated data
    df.to_csv(output_file)
    print(f"Data successfully saved to {output_file}")
    
    # Print summary
    print(f"\nSummary:")
    print(f"- Processed {len(all_processed_data)} property types")
    print(f"- Added {len(new_columns)} new columns")
    print(f"- Updated {len(df)} rows")

if __name__ == "__main__":
    main()
