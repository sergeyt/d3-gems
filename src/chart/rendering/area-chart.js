(function(ns){
	// rendering of area-based charts
	ns.area_chart = function(){

		function renderer(ctx){

			var x = ctx.scales.x;
			var y = ctx.scales.y;

			function translate_x(d, i) {
				return ctx.axes.x.scalar || ctx.axes.x.is_time ? x(ctx.categories[i]) : x(i);
			}

			var area = d3.svg.area()
				.x(translate_x)
				.y0(ctx.height)
				.y1(function(d) { return y(d); });

			var g = ctx.canvas.selectAll("g.area")
				.data(ctx.data).enter()
				.append("g")
				.classed("area", true)
				.attr("data-series", function (d, i) { return i; })
				.each(ctx.tip)
				.each(ns.hightlight);

			g.append("path")
				.style("stroke", "none")
				.style("fill", function(d, i){ return ctx.color(i); })
				.attr("d", area);
		}

		renderer.init = function(ctx){
			var line = ns.line_chart();
			return line.init(ctx);
		};

		return renderer;
	};
})(typeof f3 === 'undefined' ? window.f3 = {} : f3);
