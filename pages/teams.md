---
title: Teams Overview 2024-2025
permalink: /teams.html
layout: page-narrow
---
# Library Teams Overview 

<div class="team-nav my-5 w-100">
  <select onchange="if (this.value) window.location.href=this.value" class="w-100 p-2">
    <option value="">Jump to Team...</option>
    {% for team in site.data.teams-units %}
      {% if team.type == "Team" %}
        <option value="#{{ team.name | slugify }}">{{ team.name }}</option>
      {% endif %}
    {% endfor %}
  </select>
</div>

{% for team in site.data.teams-units %}
{% if team.type == "Team" %}
{% assign members = team.members | split: ";" %}
{% assign pdflink = team.objectid | prepend: '/assets/pdf24_25/' | append: '.pdf' |relative_url %}

## {{team.name}} 

*Overview and Objectives:* {{team.overview}}

*Fall Update:* {{team.fall-update}}

*Spring Update:* {{team.spring-update}}

*Final Outcomes:* {{team.final-reflections}}

{% include feature/button.html text="Download Overview Document" link=pdflink color="outline-primary"  target="true" %}


### Members
{% for m in members %}
- {{m}}
{% endfor %}


{% endif %}
{% endfor %}

