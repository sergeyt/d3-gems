// sample chart JSON definition
/*
{
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
	series: ["Revenue", "Units"],
	data: [
		[90, 30, 95],
		[30, 25, 27]
	],
	title: {
		text: "Test Chart",
		position: "center"
	},
	legend: {
		position: "topcenter"
	}
}
*/

(function(ns) {

// d3 chart plugin
d3.chart = function() {
	// TODO auto size from container
	var width = 300;
	var height = 200;

	function chart(selection) {
		selection.each(function(def) {

			// TODO defaults
			if (!def.axes){
				def.axes = {};
			}
			if (!def.axes.x){
				def.axes.x = {};
			}
			if (!def.axes.y){
				def.axes.y = {};
			}

			var series_keys = Array.isArray(def.series) ?
				Object.keys(def.series[0])
				: Object.keys(def.series);

			var color = Array.isArray(def.palette) ?
				d3.scale.ordinal().range(def.palette)
				: default_palette(series_keys);

			var ctx = {
				def: def,
				container: this,
				categories: typeof def.categories == 'function' ? def.categories() : def.categories,
				series: series_keys,
				color: color
			};

			ctx.renderer = ns.chart.renderer(def);
			ctx = $.extend(ctx, ctx.renderer.init(ctx));

			// prepare axes factories
			ns.axes.init(ctx);

			ctx.layout = {
				width: width,
				height: height,
				margin: {
					left: 5,
					top: 5,
					right: 5,
					bottom: 5
				}
			};

			// measure axes
			ns.axes.measure(ctx);

			var title = ns.chart.title(ctx);
			var legend = ns.chart.legend(ctx);
			ctx.legend = legend;
			ctx.layout.height -= title.height + legend.height;

			ns.chart.render_body(ctx);

			return this;
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

	function default_palette(keys){
		var color = keys.length <= 10 ? d3.scale.category10() : d3.scale.category20();
		// TODO maybe usage of names would be better?
		color.domain(0, keys.length - 1);
		return color;
	}

	return chart;
};

})(typeof f3 === 'undefined' ? window.f3 = {} : f3);
