// renders plot area with chart graphs
d3.chart.plot = function() {
	// TODO auto size from container
	var width = 300;
	var height = 200;

	function plot(element) {
		element.each(function(ctx) {

			ctx.width = width;
			ctx.height = height;
			ctx.scales = {
				x: ctx.axes.x.scale(width),
				y: ctx.axes.y.scale(height)
			};

			ctx.canvas = d3.select(this);

			// render plot area
			d3.chart.plotarea(ctx);

			// render series
			ctx.renderer(ctx);

			d3.chart.render_axes(ctx);
		});
	}

	plot.width = function(value) {
		if (!arguments.length) return width;
		width = value;
		return plot;
	};

	plot.height = function(value) {
		if (!arguments.length) return height;
		height = value;
		return plot;
	};

	return plot;
};
