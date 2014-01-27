// rendering of data points with tooltip
d3.chart.points = function(ctx, g){

	var x = ctx.scales.x;
	var y = ctx.scales.y;

	function translate_x(d, i) {
		return ctx.axes.x.scalar ? x(ctx.categories[i]) : x(i);
	}

	g.selectAll("circle.point")
		.data(function(d, i) { return d.map(function(val) { return { x: i, y: val }; }); })
		.enter()
		.append("circle")
		.classed("point", true)
		.attr("cx", function(d, i) { return translate_x(d, i); })
		.attr("cy", function(d) { return y(d.y); })
		.attr("r", 4)
		.style("stroke", "white")
		.style("stroke-width", "2")
		.style("fill", function (d) { return ctx.color(d.x); })
		.each(ctx.tip)
		.on("mouseover.pt", function(){
			d3.select(this)
				.style("stroke", function (d) { return ctx.color(d.x); })
				.style("fill", "white");
		})
		.on("mouseout.pt", function(){
			d3.select(this)
				.style("stroke", "white")
				.style("fill", function (d) { return ctx.color(d.x); });
		});
};
