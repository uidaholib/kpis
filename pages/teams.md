---
title: Teams Overview 2024-2025
permalink: /teams.html
layout: about
---
# Library Teams Overview 


{% for team in site.data.teams-units %}
{% if team.type == "Team" %}
{% assign members = team.members | split: ";" %}
{% assign pdflink = team.objectid | prepend: '/assets/pdf/' | append: '.pdf' |relative_url %}

## {{team.name}} 

*Overview and Objectives:* {{team.overview}}

*Fall Update:* {{team.fall-update}}

{% include feature/button.html text="Download Overview Document" link=pdflink color="outline-primary"  target="true" %}


### Members
{% for m in members %}
- {{m}}
{% endfor %}


{% endif %}
{% endfor %}

