# d3-gems

[![NPM version](https://badge.fury.io/js/d3-gems.png)](http://badge.fury.io/js/d3-gems)
[![Build Status](https://drone.io/github.com/sergeyt/d3-gems/status.png)](https://drone.io/github.com/sergeyt/d3-gems/latest)
[![Deps Status](https://david-dm.org/sergeyt/d3-gems.png)](https://david-dm.org/sergeyt/d3-gems)

[![NPM](https://nodei.co/npm/d3-gems.png?downloads=true&stars=true)](https://nodei.co/npm/d3-gems/)

Collection of reusable widgets powered by [d3.js](http://d3js.org/)

## JavaScript Example

Sample code below shows how to render chart.

```javascript
// first write/generate chart definition
var column_chart = {
	type: "column",
	axes: {
		x: {majorTicks: "outside"},
		y: {
			majorTicks: "outside",
			scalar: true,
			margin: true,
			grid: { major: true, minor: false }
		}
	},
	categories: ["A", "B", "A"],
	series: {
		Revenue: [90, 70, 95],
		Units: [30, 25, 27]
	},
	title: {
		text: "Test Chart",
		position: "center"
	},
	legend: {
		position: "topright"
	}
};

// then render chart
$(function(){
	$('.chart')
		.data('chart', column_chart)
		.chart();
});
```

See also examples at demo folder.
