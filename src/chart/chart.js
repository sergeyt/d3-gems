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

// TODO legend, could be a separate HTML widget

(function() {

// d3 chart plugin
d3.chart = function() {
	// TODO auto size from container
	var width = 300;
	var height = 200;

	function chart(selection) {
		selection.each(function(def) {

			var ctx = {
				def: def,
				container: this,
				categories: typeof def.categories == 'function' ? def.categories() : def.categories,
				color: d3.scale.category10()
			};

			ctx.renderer = d3.chart.renderer(def);
			ctx = $.extend(ctx, ctx.renderer.init(ctx));

			// prepare axes factories
			d3.chart.axes(ctx);

			var title = d3.chart.title(ctx);

			// TODO create div container for chart elements (title, legend, svg)
			// TODO chart layout

			var layout = {
				width: width,
				height: height - title.height,
				margin: {
					left: 50,
					top: 50,
					right: 50,
					bottom: 50
				}
			};

			ctx = $.extend(ctx, {layout: layout});

			d3.select(this).selectAll('svg').remove();

			// append svg
			var svg = d3.select(this).selectAll('svg')
				.data([ctx]).enter()
				.append('svg')
				.style('display', 'block')
				.attr('width', layout.width)
				.attr('height', layout.height);

			// init tip function
			ctx.svg = svg;
			ctx.tip = d3.chart.tip(ctx);

			var plot = d3.chart.plot()
				.width(layout.width - layout.margin.left - layout.margin.right)
				.height(layout.height - layout.margin.top - layout.margin.bottom);

			// append and render plotarea
			svg.append('g')
				.attr('transform', 'translate(' + layout.margin.left + ',' + layout.margin.top + ')')
				.call(plot);

			// TODO return svg container
			return svg;
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
