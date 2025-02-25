---
title: How To Edit and Create New Data Files
permalink: /docs/data.html
layout: page-narrow
---

# How To Edit and Create New Data Files

> **⚠️ Important:** Do not open or edit CSV files using Excel before adding them to this repository. Excel can modify the file encoding and add extra characters that break Jekyll's ability to process the data. Always use a text editor or the GitHub web interface to work with these files.

## Contents

- [Data File Basics](#data-file-basics)
- [Working with Files on GitHub](#working-with-files-on-github)
- [Working with Local Files](#working-with-local-files)

## Data File Basics

All data files for the KPI dashboards are CSV (Comma-Separated Values) files located in the `/kpidata/` directory. Each file should follow these conventions:

1. First row contains column headers
2. First column can be the date/time period or it can be blank
3. Each metric should be in its own row
4. Missing data should be left blank (not 0)

Example data structure:
```csv
,Spring 2020,Summer 2020,Fall 2020
Total Interactions,1183,291,978
In Person,324,0,7
IM,636,153,808
Email,109,124,140
```


## Preparing Data from Excel

This is assuming your using the copy of record to replace data in the dashboard site. 

> **Note:** You can also use Google Sheets to create and edit data, and then just download the sheet as a CSV using the options via the File menu. If you're having issues with the file breaking the repo (i.e. not allowing it to update or build), try using Google Sheets to get cleaner data. 

#### Desktop Excel
1. Open your Excel file
2. Go to File → Save As
3. Choose "CSV UTF-8 (Comma delimited) (*.csv)" as the file type
4. Save the file
5. **Do not open the exported CSV file with Excel**
6. Rename the file to match the name of the file you're replacing in the repository
7. Follow the [instructions below](#replacing-files) to replace the file in GitHub

#### Online Excel/SharePoint
1. Open your Excel file in the browser
2. Click File → Export → Download as CSV
3. **Do not open the downloaded CSV file with Excel**
4. Rename the downloaded file to match the name of the file you're replacing in the repository

> **Note:** The file name in the repository is case-sensitive. Make sure your new file's name matches exactly.

> **Note:** The file name in the repository is case-sensitive. Make sure your new file's name matches exactly.

## Working with GitHub

### Replacing Files

1. Navigate to the file you want to replace
2. Click the three dots (...) menu
3. Select "Delete file"
4. Commit the deletion
5. Return to the `/kpidata` folder
6. Ensure your new file is named the same as the previous file!!!
6. Click "Add file" → "Upload files"
7. Drag your new CSV file or choose it from your computer
8. Add a commit message explaining the replacement
9. Click "Commit changes"

### Editing Existing Files

1. Navigate to the `/kpidata` folder in the repository
2. Click on the CSV file you want to edit
3. Click the pencil icon (Edit this file)
4. Make your changes:
   - Add new rows at the bottom
   - Update existing values
   - Ensure commas separate each value
5. Add a commit message describing your changes
6. Click "Commit changes"

### Adding New Files

1. Navigate to the `/kpidata` folder
2. Click "Add file" → "Create new file"
3. Name your file with `.csv` extension (e.g., `new-metrics.csv`)
4. Add your CSV content:
   ```csv
   ,2023,2024
   Gate Counts,1234,5678
   ```
   - If you open a downloaded file, open it with a text editor
    - Be sure not to have opened this CSV in Excel prior to adding it
   - Copy the CSV text and paste it into the new file content
5. Add a commit message describing the new file
6. Click "Commit new file"

## Working with Local Files

For more extensive updates or creating new files, you can use a text editor like VS Code:

1. Clone the repository using GitHub Desktop or VS Code
2. Create or edit CSV files in the `kpidata` folder
3. Commit and push your changes up to the GitHub repository


Remember to always pull the latest changes before editing and push your changes after updating files.

