$(function(){
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

	var line_chart = {
		type: "line",
		axes: {
			x: { majorTicks: "outside" },
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
			Units: [55, 80, 67]
		},
		title: {
			text: "Test Chart",
			position: "center"
		},
		legend: {
			position: "bottomcenter"
		}
	};

	var area_chart = {
		type: "area",
		axes: {
			x: { majorTicks: "outside" },
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
			Units: [55, 80, 67]
		},
		title: {
			text: "Test Chart",
			position: "center"
		},
		legend: {
			position: "topcenter"
		}
	};

	var charts = window.__charts__ = {
		'column': column_chart,
		'line': line_chart,
		'area': area_chart
	};

	Object.keys(charts).forEach(function(key){
		var template = '<div class="chart outlined" data-chart="{0}"></div>';
		$(f3.format(template, key)).appendTo($('body'));
	});

	$('.chart').chart();
});
