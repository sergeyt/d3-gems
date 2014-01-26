// rendering of line-based charts
d3.line_chart = function(){

	function renderer(ctx){

		var x = ctx.scales.x;
		var y = ctx.scales.y;

		function translate_x(d, i) {
			return ctx.axes.x.scalar ? x(ctx.categories[i]) : x(i);
		}

		var line = d3.svg.line()
			.x(translate_x)
			.y(y);

		var g = ctx.canvas.selectAll("g.line")
			.data(ctx.data).enter()
			.append("g")
			.classed("line", true)
			.attr("data-series", function (d, i) { return i; });

		g.append("path")
			.attr("class", function (d, i) { return "pal" + i; })
			.style("fill", "none")
			.attr("d", function (d) { return line(d); });

		// data points with tooltip
		g.selectAll("circle.point")
			.data(function(d, i) { return d.map(function(val) { return { x: i, y: val }; }); })
			.enter()
			.append("circle")
			.attr("class", function (d) { return "pal" + d.x; })
			.classed("point", true)
			.attr("cx", function(d, i) { return translate_x(d, i); })
			.attr("cy", function(d) { return y(d.y); })
			.attr("r", 1.5)
			.style("stroke", "none")
			.each(ctx.tip);
	}

	renderer.init = function(ctx){
		var def = ctx.def;
		var min = NaN, max = NaN;
		var data = [];
		for (var i = 0; i < def.series.length; i++) {

			var series = get_series(def, i);

			var e = d3.extent(series);
			if (isNaN(min)) {
				min = e[0];
				max = e[1];
			} else {
				min = Math.min(min, e[0]);
				max = Math.max(max, e[1]);
			}
			data.push(series);
		}
		return {
			is_ordinal: true,
			min: min,
			max: max,
			data: data
		};
	};

	function get_series(def, i){
		return def.data[i].map(function(pt) {
			// TODO support objects, functions
			return pt;
		});
	}

	return renderer;
};
