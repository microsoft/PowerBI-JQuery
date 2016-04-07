# PowerBI-JQuery
JQuery plugin which wraps the PowerBI-Javascript library and accepts configuration object directly. This makes embedding Power BI visuals similar to using other jQuery plugins.

For a demonstration of this library see the sample: **powerbi-sample-client-jquery** (COMING SOON!)

## Getting started:
1. **Include necessary javascript files in your project:**
	
	`<script src="powerbi.js"></script>`

	`<script src="jquery.js"></script>`

	`<script src="jquery.powerbi.js"></script>`

	Note: You can find `powerbi.js` from the [PowerBI-JavaScript](https://github.com/Microsoft/PowerBI-JavaScript) repository.

2. **Setup a server which can return an embed URL and access token for a report.**

	This requires that you have a server running which outputs the necessary data for embedding reports.

	If you don't have your own server setup you can run our samples:

	- C# sample: COMING SOON.

	- Node sample: COMING SOON.

	An example response for a single report request may look like this:
	```
	GET http://localhost:1248/api/reports/63f50faa-f1fe-40ed-ab33-67fb09b80251
	
	Response:
	{
	    "accessToken": "eyJ0eXA...<removed>...D8MFM",
	    "id": "63f50faa-f1fe-40ed-ab33-67fb09b80251",
	    "name": "Sample Report 1",
	    "webUrl": "https://powerbi-df.analysis-df.windows.net/reports/63f50faa-f1fe-40ed-ab33-67fb09b80251",
	    "embedUrl": "https://powerbi-df.analysis-df.windows.net/appTokenReportEmbed?reportId=63f50faa-f1fe-40ed-ab33-67fb09b80251"
	}
	```


3. **Fetch the embed data from the server, select the desired element to embed within, and call the powerbi plugin function with the configuration object containing the embed url and token from the server**

	Index.html
	```
	<div id="reportContainer"></div>
	```
	App.js
	```
    $(() => {
        var $reportContainer = $('#reportContainer');

        var reportUrl = 'http://localhost:1248/api/reports/63f50faa-f1fe-40ed-ab33-67fb09b80251';
            
        fetch(reportUrl)
            .then(response => response.json())
            .then(report => {
                var reportConfig = $.extend({ type: 'powerbi-report' }, report);
                $reportContainer.powerbi(reportConfig);
            });
    });
	```
	Note: The config must have a `type` parameter which matches the type of the object you are embedding. In this case it we are embedding a report so the type is 'powerbi-report'.
	
