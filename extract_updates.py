#!/usr/bin/env python3
"""
Extract Spring Updates and Final Outcomes from final reports for CSV update
"""

import os
import re
from pathlib import Path

def extract_spring_updates(text):
    """Extract Spring Update sections from text"""
    spring_updates = []
    
    # Look for Spring Update sections
    lines = text.split('\n')
    in_spring_update = False
    current_update = []
    
    for i, line in enumerate(lines):
        line = line.strip()
        
        # Check if this is a Spring Update header
        if re.match(r'.*Spring Update.*:', line, re.IGNORECASE):
            if current_update and in_spring_update:
                spring_updates.append('\n'.join(current_update))
            current_update = []
            in_spring_update = True
            continue
        
        # Check if we've hit another section that should end the spring update
        if in_spring_update:
            if (re.match(r'.*Final Outcomes.*', line, re.IGNORECASE) or
                re.match(r'.*Fall Update.*:', line, re.IGNORECASE) or
                re.match(r'.*Objective.*:', line, re.IGNORECASE) or
                re.match(r'.*Unit/Team Metrics.*', line, re.IGNORECASE) or
                re.match(r'.*Membership.*:', line, re.IGNORECASE)):
                if current_update:
                    spring_updates.append('\n'.join(current_update))
                current_update = []
                in_spring_update = False
                continue
        
        if in_spring_update and line:
            current_update.append(line)
    
    # Add the last update if we were still in one
    if current_update and in_spring_update:
        spring_updates.append('\n'.join(current_update))
    
    return spring_updates

def extract_final_outcomes(text):
    """Extract Final Outcomes sections from text"""
    final_outcomes = []
    
    lines = text.split('\n')
    in_final_outcomes = False
    current_outcome = []
    
    for line in lines:
        line = line.strip()
        
        # Check if this is a Final Outcomes header
        if re.match(r'.*Final Outcomes.*', line, re.IGNORECASE):
            if current_outcome and in_final_outcomes:
                final_outcomes.append('\n'.join(current_outcome))
            current_outcome = []
            in_final_outcomes = True
            continue
        
        # Check if we've hit another major section
        if in_final_outcomes:
            if (re.match(r'.*Challenges.*', line, re.IGNORECASE) or
                re.match(r'.*Opportunities.*', line, re.IGNORECASE) or
                re.match(r'.*Membership.*', line, re.IGNORECASE) or
                re.match(r'.*Team/Unit Members.*', line, re.IGNORECASE) or
                re.match(r'.*Reporting to.*', line, re.IGNORECASE)):
                if current_outcome:
                    final_outcomes.append('\n'.join(current_outcome))
                current_outcome = []
                in_final_outcomes = False
                continue
        
        if in_final_outcomes and line:
            current_outcome.append(line)
    
    # Add the last outcome if we were still in one
    if current_outcome and in_final_outcomes:
        final_outcomes.append('\n'.join(current_outcome))
    
    return final_outcomes

def clean_text_for_csv(text):
    """Clean text for CSV formatting"""
    if not text:
        return ""
    
    # Join multiple sections with periods
    if isinstance(text, list):
        text = '. '.join(text)
    
    # Remove markdown formatting
    text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)  # Remove bold
    text = re.sub(r'^\s*[-▪•]\s*', '', text, flags=re.MULTILINE)  # Remove bullet points
    text = re.sub(r'^\s*\d+\.\s*', '', text, flags=re.MULTILINE)  # Remove numbered lists
    
    # Clean up whitespace
    text = re.sub(r'\n\s*\n', ' ', text)  # Replace line breaks with spaces
    text = re.sub(r'\s+', ' ', text)  # Collapse multiple spaces
    text = text.strip()
    
    # Escape quotes for CSV
    text = text.replace('"', '""')
    
    return text

def main():
    reports_dir = Path('_final_reports24_25')
    
    # Mapping of report filenames to CSV objectids
    report_mapping = {
        'ats.md': 'ats',
        'collections.md': 'collections',
        'digital-collections.md': 'digital-collections',
        'discovery.md': 'discovery',
        'fye.md': 'fye',
        'instruction.md': 'instruction',
        'liaisons.md': 'liaisons',
        'marcom.md': 'marcom',
        'open-strategies.md': 'open-strategies',
        'physical-spaces.md': 'physical-spaces',
        'research-impact.md': 'research-impact',
        'student-employment.md': 'student-employment',
        'student-engagement.md': 'student-engagement',
        'website.md': 'website',
        'aeu.md': 'aeu',
        'dau.md': 'dau',
        'dsos.md': 'dsos',
        'rel.md': 'rel',
        'spec.md': 'spec'
    }
    
    results = {}
    
    for filename, objectid in report_mapping.items():
        filepath = reports_dir / filename
        if not filepath.exists():
            print(f"Warning: {filename} not found")
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        spring_updates = extract_spring_updates(content)
        final_outcomes = extract_final_outcomes(content)
        
        spring_text = clean_text_for_csv(spring_updates)
        final_text = clean_text_for_csv(final_outcomes)
        
        results[objectid] = {
            'spring_update': spring_text,
            'final_reflections': final_text
        }
        
        print(f"\n{objectid.upper()}:")
        print(f"Spring Update: {spring_text[:100]}..." if len(spring_text) > 100 else f"Spring Update: {spring_text}")
        print(f"Final Outcomes: {final_text[:100]}..." if len(final_text) > 100 else f"Final Outcomes: {final_text}")
    
    return results

if __name__ == "__main__":
    main()
