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
{% assign teamlink = '/teams.html' |relative_url %}
{% assign unitlink = '/units.html' |relative_url %}

<h2>Overview Documents</h2>

{% include feature/button.html text="Library Annual Manual" link=manuallink color="outline-success btn-lg my-3" %}

{% include feature/button.html text="Teams Overview" link=teamlink color="outline-success btn-lg ms-3" %} 

{% include feature/button.html text="Unit Overview" link=unitlink color="outline-success btn-lg m-3" %} 

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