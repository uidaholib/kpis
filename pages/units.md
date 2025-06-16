---
title: Units and Department Overview 2024-2025
permalink: /units.html
layout: page-narrow
---
# Library Units Overview 
 
<div class="team-nav my-5 w-100">
  <select onchange="if (this.value) window.location.href=this.value" class="w-100 p-2">
    <option value="">Jump to Unit...</option>
    {% for team in site.data.teams-units %}
      {% if team.type == "Unit" %}
        <option value="#{{ team.name | slugify }}">{{ team.name }}</option>
      {% endif %}
    {% endfor %}
  </select>
</div>

{% for unit in site.data.teams-units %}
{% if unit.type == "Unit" %}
{% assign members = unit.members | split: ";" %}
{% assign pdflink = unit.objectid | prepend: '/assets/pdf24_25/' | append: '.pdf' |relative_url %}

## {{unit.name}} 

*Overview and Objectives:* {{unit.overview}}

*Fall Update:* {{unit.fall-update}}

*Spring Update:* {{unit.spring-update}}

*Final Outcomes:* {{unit.final-reflections}}

{% include feature/button.html text="Download Overview Document" link=pdflink color="outline-primary" target="true" %}


### Members
{% for m in members %}
- {{m}}
{% endfor %}


{% endif %}
{% endfor %}

