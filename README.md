indicator-table-wirecloud [![Build Status](http://ci.cismet.de/buildStatus/icon?job=indicator-table-wirecloud)](https://ci.cismet.de/view/html5%20javascript/job/indicator-table-wirecloud/)
=====================================

Wrapper of the indicators table that is part of the [Worldstate Analysis Widgets (AngularJS)](https://github.com/crismaproject/worldstate-analysis-widgets) to make it available on WireCloud separately.

## Get started

Simply download the binary from [here](http://crisma.cismet.de/lib/wirecloud/indicator-table-wirecloud.min.wgt). Then upload the widget to your local marketplace of the WireCloud platform that you want to use.

You can also build the widget from scratch. The project uses [npm](https://www.npmjs.org/)/[bower](http://bower.io/)/[grunt](http://gruntjs.com/) for project management. Follow [these instructions](https://gist.github.com/mscholl/a0aef5a8c6664dc275b5) on how to build such a project.

## Configuration

```xml

    <Platform.Preferences>
        <Preference 
            name="DEBUG" 
            type="text" 
            description="Toggle debug mode" 
            label="DEBUG toggle" default="true"/>
        <Preference 
            name="CRISMA_DOMAIN" 
            type="text" 
            description="The CRISMA domain this widget lives in" 
            label="CRISMA domain" 
            default="CRISMA"/>
        <Preference 
            name="CRISMA_ICMM_API" 
            type="text" 
            description="The URL to the ICMM API instance" 
            label="CRISMA ICMM API" 
            default="http://crisma.cismet.de/icmm_api"/>
    </Platform.Preferences>
  
```

## Interface

```xml

    <Platform.Wiring>
        <InputEndpoint
            name="setSelectedWorldstates"
            type="text"
            label="Select worldstates"
            description="Let's other widgets select specific worldstates. The text has to be an array of worldstate ids only so every widget has to agree on a single ICMS instance"
            friendcode="selectedWorldstates"/>
    </Platform.Wiring>
    
```
