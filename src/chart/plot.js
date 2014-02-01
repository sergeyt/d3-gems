(function(ns){

	if (typeof ns.chart === 'undefined') {
		ns.chart = {};
	}

	// renders plot area with chart graphs
	ns.chart.plot = function() {

		function plot(element) {
			element.each(function(ctx) {

				ctx.canvas = d3.select(this);

				// render plot area
				ns.chart.plotarea(ctx);

				// render series
				ctx.renderer(ctx);

				ns.axes.render(ctx);
			});
		}

		plot.init = function(ctx){
			var layout = ctx.layout;
			// TODO set layout.plot.width, layout.plot.height
			var width = layout.width - layout.margin.left - layout.margin.right;
			var height = layout.height - layout.margin.top - layout.margin.bottom;
			ctx.width = width;
			ctx.height = height;
			ctx.scales = {
				x: ctx.axes.x.scale(width),
				y: ctx.axes.y.scale(height)
			};
			return plot;
		};

		return plot;
	};
})(typeof f3 === 'undefined' ? window.f3 = {} : f3);
