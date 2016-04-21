# PowerBI-JQuery
JQuery plugin which wraps the PowerBI-Javascript library and accepts configuration object directly. This makes embedding Power BI visuals similar to using other jQuery plugins.

For a demonstration of this library see the sample: **powerbi-sample-client-jquery** (COMING SOON!)

## Getting started:

### **Installation**

Install via NPM:

`npm install --save jquery-powerbi`

Install via Bower:

`bower install --save jquery-powerbi`


### **Include scripts**:
	
```
<script src="powerbi.js"></script>
<script src="jquery.js"></script>
<script src="jquery.powerbi.js"></script>
```

Note: You can find out more about powerbi.js from the [PowerBI-JavaScript](https://github.com/Microsoft/PowerBI-JavaScript) repository.

### **Embed report in element using plugin**

Index.html
```
<div id="reportContainer"></div>
```
App.js
```
$(() => {
	var $reportContainer = $('#reportContainer');

	var reportUrl = 'http://powerbipaasapi.azurewebsites.net/api/reports/63f50faa-f1fe-40ed-ab33-67fb09b80251';
		
	fetch(reportUrl)
		.then(response => response.json())
		.then(report => {
			var reportConfig = $.extend({ type: 'report' }, report);
			$reportContainer.powerbi(reportConfig);
		});
});
```

Note the object that you pass to the powerbi plugin function must have the following properties but there may be more:

```
{
	"type": "report",
	"accessToken": "eyJ0eXA...<removed>...D8MFM",
	"embedUrl": "https://embedded.powerbi.com/appTokenReportEmbed?reportId=5dac7a4a-4452-46b3-99f6-a25915e0fe55"
}
```

Note: The `type` property which indicates the type of the object you are embedding. In this case it we are embedding a report so the type is 'report'.
There are other options that can be passed such as `filterPaneEnabled`, see the [PowerBI-JavaScript](https://github.com/Microsoft/PowerBI-JavaScript) repository for more information.

