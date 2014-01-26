// rendering of area-based charts
d3.area_chart = function(){

	function renderer(ctx){

		var x = ctx.scales.x;
		var y = ctx.scales.y;

		function translate_x(d, i) {
			return ctx.axes.x.scalar ? x(ctx.categories[i]) : x(i);
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
			.each(ctx.tip);

		g.append("path")
			.attr("class", function (d, i) { return "pal" + i; })
			.style("stroke", "none")
			.attr("d", area);
	}

	renderer.init = function(ctx){
		var line = d3.line_chart();
		return line.init(ctx);
	};

	return renderer;
};
