# University of Idaho Library KPIs

A comprehensive data-driven website showcasing Key Performance Indicators (KPIs), achievements, and organizational structure for the University of Idaho Library. Built on Jekyll and CollectionBuilder, this site provides an interactive gallery of library metrics, team overviews, and annual reports.

## 🔍 Overview

This repository powers a website that tracks and visualizes the University of Idaho Library's performance across multiple service areas including:

- **Building Usage** - Patron visits and facility utilization
- **Catalog** - Bibliographic records and catalog management
- **Course Reserves** - Textbook affordability and access
- **Digital Collections** - 77,000+ digitized items across 139+ collections
- **Electronic Resources** - Database usage and cost-per-use metrics
- **Fellowships** - Student and faculty fellowship programs
- **GIS Services** - Geographic information systems support
- **Instruction & Workshops** - Educational programming and literacy instruction
- **Open Publishing** - Open educational resources and publishing initiatives
- **Physical Circulation** - Physical material borrowing patterns
- **Research Assistance** - Reference and research consultations
- **Resource Sharing (ILL)** - Interlibrary loan statistics
- **Special Collections & Archives** - Unique materials and archival services
- **Student Employment** - Student worker programs
- **VERSO** - Research information management system
- **Web Analytics** - Website traffic and user engagement across all library properties

## 🏗️ Technical Stack

- **Static Site Generator**: Jekyll 
- **Framework**: [CollectionBuilder](https://collectionbuilder.github.io/) (CSV variant)
- **Languages**: Ruby, Python, Liquid templating
- **Styling**: Bootstrap 5, custom Sass
- **Data Format**: CSV files for KPI data
- **Analytics Processing**: Python scripts for data transformation

## 📂 Repository Structure

```
├── _config.yml                 # Jekyll configuration
├── _data/                      # CSV data files
│   ├── kpi-sections.csv       # KPI section definitions
│   ├── teams-units.csv        # Organizational structure
│   └── config-*.csv           # CollectionBuilder configs
├── _final_reports24_25/       # Annual team/unit reports
├── _layouts/                   # Page templates
├── _includes/                  # Reusable components
├── _plugins/                   # Custom Jekyll plugins
├── _sass/                      # Custom styling
├── pages/                      # Main content pages
├── kpidata/                    # KPI datasets (CSV)
├── assets/                     # Static assets (CSS, images, PDFs)
├── convert_pdfs.py            # PDF to Markdown converter
├── process_all_web_data.py    # Web analytics processor
└── process_web_data.py        # Individual web data processor
```

## 🚀 Getting Started

### Prerequisites

- Ruby (2.7 or higher)
- Bundler gem
- Python 3.7+ (for data processing scripts)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/[organization]/kpis.git
cd kpis
```

2. Install Ruby dependencies:
```bash
bundle install
```

3. Install Python dependencies (for data processing):
```bash
pip install pandas pdfplumber
```

### Local Development

Run the Jekyll development server:
```bash
bundle exec jekyll serve
```

Visit `http://localhost:4000` in your browser.

For live reload during development:
```bash
bundle exec jekyll serve --livereload
```

## 📊 Data Management

### Adding KPI Data

KPI data is stored as CSV files in the `kpidata/` directory. Each KPI section has its own CSV file following this naming convention:

- `building-usage.csv`
- `catalog.csv`
- `digital-collections.csv`
- etc.

### Processing Web Analytics

The repository includes Python scripts for processing web analytics data:

```bash
# Process all web properties data
python process_all_web_data.py

# Process individual web data files
python process_web_data.py
```

### Converting PDF Reports to Markdown

To convert PDF reports to Markdown format for Jekyll collections:

```bash
python convert_pdfs.py
```

This script uses `pdfplumber` to extract text and converts it to properly formatted Markdown files with Jekyll front matter.

## 📝 Adding Content

### Creating New KPI Pages

1. Add a new markdown file in `pages/` directory
2. Include Jekyll front matter with layout and permalink
3. Reference the corresponding CSV data file from `kpidata/`
4. Add entry to `_data/kpi-sections.csv` for navigation

### Adding Team/Unit Reports

1. Create a new markdown file in `_final_reports24_25/` directory
2. Add front matter with appropriate metadata
3. The file will automatically be included in the collection

## 🛠️ Customization

### Styling

Custom styles are defined in `_sass/`:
- `_custom.scss` - Site-specific customizations
- `_theme-colors.scss` - Color scheme definitions
- `_pages.scss` - Page-specific styles

### Configuration

Edit `_config.yml` to modify:
- Site title and description
- Organization branding
- Collection settings
- Navigation structure

## 🎯 Key Features

- **Interactive Data Visualizations**: Charts and graphs powered by Chart.js
- **Responsive Design**: Mobile-friendly interface using Bootstrap 5
- **Team & Unit Overviews**: Detailed organizational structure pages
- **Annual Reports**: Collections-based report management
- **Achievement Tracking**: Comprehensive accomplishments and challenges pages
- **Accessibility Compliant**: WCAG 2.1 AA standards
- **Search Functionality**: Lunr.js powered search across all content

## 📄 Documentation

Additional documentation can be found in:
- `CONTRIBUTING.md` - Contribution guidelines
- `CODE_OF_CONDUCT.md` - Community standards
- `SECURITY.md` - Security policies
- `CITATION.cff` - Citation information

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📜 License

This project is licensed under the terms specified in [LICENSE](LICENSE).

## 🔗 Related Resources

- [CollectionBuilder Documentation](https://collectionbuilder.github.io/cb-docs/)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [University of Idaho Library](https://www.lib.uidaho.edu/)

## 📧 Contact

For questions or support, contact the University of Idaho Library Digital Initiatives team.

---

**Built with ❤️ by the University of Idaho Library** 