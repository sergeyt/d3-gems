// sample chart JSON definition
//"chart3": {
//	"type": "column",
//	"subtype": "plain",
//	"xaxis": {"majorTicks": "outside"},
//	"yaxis": {
//		"majorTicks": "outside",
//		"scalar": true,
//		"margin": true,
//		"grid": { "major": true, "minor": false }
//	},
//	"categories": ["A", "B", "A"],
//	"series": ["Revenue", "Units"],
//	"data": [
//		[90, 30, 95],
//		[30, 25, 27]
//	],
//	"title": {
//		"text": "Test Chart",
//		"position": "center"
//	},
//	"legend": {
//		"position": "topcenter"
//	}
//}

// TODO create axes
// TODO renderer based on chart type (should be easy extensible)
// TODO legend, could be a separate HTML widget


(function() {

// d3 chart plugin
d3.chart = function() {
	// TODO auto size from container
	var width = 300;
	var height = 200;

	function chart(element) {
		element.each(function(def) {

			// TODO create div container for chart elements (title, legend, svg)

			var canvas = d3.select(this);
			var renderer = d3.chart.renderer(def);

			// preprocess data to calculate min, max, etc
			var context = renderer.init(def);

			// render plot area
			plotarea = d3.chart.plotarea(canvas, width, height);

			// render series
			renderer(canvas, context, def);

			// TODO render axes
		});
	}

	chart.width = function(value) {
		if (!arguments.length) return width;
		width = value;
		return chart;
	};

	chart.height = function(value) {
		if (!arguments.length) return height;
		height = value;
		return chart;
	};

	return chart;
};

})();
