---
layout: about
title: Library KPIs and Organizational Overview
permalink: /
---


<div class="row">
<div class="col-md-8 offset-md-2">
<h1>{{page.title}}</h1>

<p>This site provides an interactive gallery of the University of Idaho Library's Key Performance Indicators (KPIs) together with an overview of the Teams, Units, and Department that drive the KPIs.</p>

{% assign manuallink = '/assets/pdf/LibraryAnnualManual24-25.pdf' |relative_url %}
{% assign teams2526link = '/teams2025-2026.html' |relative_url %}
{% assign teams2425link = '/teams2024-2025.html' |relative_url %}
{% assign units2526link = '/units2025-2026.html' |relative_url %}
{% assign units2425link = '/units2024-2025.html' |relative_url %}

<!--{% include feature/alert.html text="It's been a great year! Check out the library's [<i class='bi bi-balloon'></i>2024-2025 Achievement report](accomplishments24-25.html)" color="info" align="center" %}-->

<h2>Overview Documents</h2>

{% include feature/button.html text="Annual Manual" link=manuallink color="outline-success btn-lg my-3" %}

<button class="btn btn-outline-success btn-lg dropdown-toggle" type="button" id="teamsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
  Teams Overview
</button>
<ul class="dropdown-menu" aria-labelledby="teamsDropdown">
  <li><a class="dropdown-item" href="{{ teams2526link }}">2025-2026</a></li>
  <li><a class="dropdown-item" href="{{ teams2425link }}">2024-2025</a></li>
</ul>

<button class="btn btn-outline-success btn-lg dropdown-toggle" type="button" id="unitsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
  Units Overview
</button>
<ul class="dropdown-menu" aria-labelledby="unitsDropdown">
  <li><a class="dropdown-item" href="{{ units2526link }}">2025-2026</a></li>
  <li><a class="dropdown-item" href="{{ units2425link }}">2024-2025</a></li>
</ul> 

<button class="btn btn-outline-secondary btn-lg dropdown-toggle" type="button" id="docsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
  Docs
</button>
<ul class="dropdown-menu" aria-labelledby="docsDropdown">
  {% for item in site.data.config-nav %}
    {% if item.dropdown_parent == "Docs" %}
      <li><a class="dropdown-item" href="{{ item.stub | relative_url }}" target="_blank">{{ item.display_name }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
<button class="btn btn-outline-secondary btn-lg dropdown-toggle" type="button" id="docsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
  Forms
</button>
<ul class="dropdown-menu" aria-labelledby="docsDropdown">
  {% for item in site.data.config-nav %}
    {% if item.dropdown_parent == "Forms" %}
      <li><a class="dropdown-item" href="{{ item.stub | relative_url }}" target="_blank">{{ item.display_name }}</a></li>
    {% endif %}
  {% endfor %}
</ul>


<hr>

<h2>KPIs</h2>

{% for k in site.data.kpi-sections %}
                  <a href="{{ k.url | relative_url }}" class="btn btn-outline-primary m-2">
                      <i class="{{k.icon}}"></i>
                      {{k.title}}
                  </a> 
                {% endfor%}

</div>
</div>