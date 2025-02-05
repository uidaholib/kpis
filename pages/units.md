---
title: Units and Department Overview 2024-2025
permalink: /units.html
layout: about
---
# Library Units Overview 
 
{% for unit in site.data.teams-units %}
{% if unit.type == "Unit" %}
{% assign members = unit.members | split: ";" %}
{% assign pdflink = unit.objectid | prepend: '/assets/pdf/' | append: '.pdf' |relative_url %}

## {{unit.name}} 

*Overview and Objectives:* {{unit.overview}}

*Fall Update:* {{unit.fall-update}}

{% include feature/button.html text="Download Overview Document" link=pdflink color="outline-primary" target="true" %}


### Members
{% for m in members %}
- {{m}}
{% endfor %}


{% endif %}
{% endfor %}

