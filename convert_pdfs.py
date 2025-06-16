#!/usr/bin/env python3
"""
Convert PDF files to Markdown format for Jekyll collection
"""

import os
import re
import pdfplumber
from pathlib import Path

def clean_text(text):
    """Clean extracted text for better markdown formatting while preserving structure"""
    lines = text.split('\n')
    cleaned_lines = []
    
    for line in lines:
        original_line = line
        line = line.strip()
        
        # Skip empty lines
        if not line:
            cleaned_lines.append('')
            continue
            
        # Skip likely page numbers (standalone numbers)
        if re.match(r'^\d+$', line):
            continue
            
        # Skip very short lines that might be headers/footers (but keep meaningful short lines)
        if len(line) <= 2 and not re.match(r'^[a-zA-Z]\.?$', line):
            continue
            
        # Convert bullet points and nested lists
        # Handle main bullet points
        if line.startswith('•'):
            line = re.sub(r'^•\s*', '- ', line)
        elif line.startswith('◦'):
            line = re.sub(r'^◦\s*', '  - ', line)
        # Handle "o " as nested bullet points (common in PDF extraction)
        elif re.match(r'^o\s+', line):
            line = re.sub(r'^o\s+', '  - ', line)
        # Handle numbered lists
        elif re.match(r'^\d+\.\s+', line):
            pass  # Keep numbered lists as-is
            
        # Try to detect headings and make them bold
        # Common patterns: ALL CAPS, Title Case with no punctuation at end
        if (line.isupper() and len(line.split()) > 1 and len(line) < 100 and 
            not line.endswith('.') and not line.startswith('-') and not line.startswith('  -')):
            line = f"**{line}**"
        # Detect section headers that might be important
        elif (line.endswith(':') and len(line.split()) <= 5 and 
              not line.startswith('-') and not line.startswith('  -')):
            line = f"**{line}**"
        # Detect standalone section headings (common patterns)
        elif (re.match(r'^(Accomplishments|Challenges|Opportunities|Final Outcomes|Objectives|Overview|Library KPIs|Unit/Team Metrics|Membership|Fall Update|Spring Update)$', line, re.IGNORECASE)):
            line = f"**{line}**"
        # Detect "Objective #N" patterns
        elif re.match(r'^Objective\s+#?\d+$', line, re.IGNORECASE):
            line = f"**{line}**"
            
        # Preserve indentation for nested content
        if original_line.startswith('  ') and not line.startswith('  -'):
            # Maintain some indentation for continuation lines
            line = '  ' + line
            
        cleaned_lines.append(line)
    
    # Join lines and clean up excessive whitespace
    result = '\n'.join(cleaned_lines)
    
    # Remove excessive line breaks (more than 2 consecutive)
    result = re.sub(r'\n\s*\n\s*\n+', '\n\n', result)
    
    # Fix common PDF extraction spacing issues
    result = re.sub(r'([a-z])([A-Z])', r'\1 \2', result)
    
    return result

def extract_title_from_filename(filename):
    """Extract a readable title from filename"""
    # Remove .pdf extension and replace hyphens/underscores with spaces
    title = filename.replace('.pdf', '').replace('-', ' ').replace('_', ' ')
    # Capitalize each word
    return title.title()

def convert_pdf_to_markdown(pdf_path, output_dir):
    """Convert a single PDF to Markdown with Jekyll front matter"""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n\n"
        
        # Clean the extracted text
        clean_content = clean_text(text)
        
        # Get filename without extension for Jekyll slug
        filename = Path(pdf_path).stem
        title = extract_title_from_filename(Path(pdf_path).name)
        
        # Create Jekyll front matter
        front_matter = f"""---
layout: page
title: "{title}"
permalink: /final-reports/{filename}/
collection: final_reports24_25
---

"""
        
        # Combine front matter with content
        markdown_content = front_matter + clean_content
        
        # Create output filename
        output_file = output_dir / f"{filename}.md"
        
        # Write the markdown file
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        
        print(f"✓ Converted {pdf_path.name} -> {output_file.name}")
        return True
        
    except Exception as e:
        print(f"✗ Failed to convert {pdf_path.name}: {str(e)}")
        return False

def main():
    # Set up paths
    current_dir = Path(__file__).parent
    pdf_dir = current_dir / "assets" / "pdf24_25"
    output_dir = current_dir / "_final_reports24_25"
    
    # Create output directory
    output_dir.mkdir(exist_ok=True)
    
    print(f"Converting PDFs from: {pdf_dir}")
    print(f"Output directory: {output_dir}")
    print("-" * 50)
    
    # Find all PDF files
    pdf_files = list(pdf_dir.glob("*.pdf"))
    
    if not pdf_files:
        print("No PDF files found!")
        return
    
    # Convert each PDF
    successful = 0
    for pdf_file in pdf_files:
        if convert_pdf_to_markdown(pdf_file, output_dir):
            successful += 1
    
    print("-" * 50)
    print(f"Conversion complete: {successful}/{len(pdf_files)} files converted successfully")
    
    # Create a simple index file for the collection
    index_content = f"""---
layout: page
title: "Final Reports 2024-25"
permalink: /final-reports/
---

# Final Reports 2024-25

This collection contains the final reports for the 2024-25 academic year.

## Available Reports

"""
    
    for pdf_file in sorted(pdf_files):
        filename = pdf_file.stem
        title = extract_title_from_filename(pdf_file.name)
        index_content += f"- [{title}](/final-reports/{filename}/)\n"
    
    index_file = output_dir / "index.md"
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(index_content)
    
    print(f"✓ Created index file: {index_file}")

if __name__ == "__main__":
    main()
