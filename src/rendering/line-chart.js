(function(){

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
				.classed("line", true);

			g.append("path")
				.attr("class", function (d, i) { return "pal" + i; })
				.style("fill", "none")
				.attr("d", function (d) { return line(d); });

			// data points with tooltip
			g.selectAll("circle.point")
				.data(function(d, i) { return d.map(function(v) { return { s: i, y: v }; }); })
				.enter()
				.append("circle")
				.attr("class", function (d) { return "pal" + d.s; })
				.classed("point", true)
				.attr("cx", function(d, i) { return translate_x(d, i); })
				.attr("cy", function(d) { return y(d.y); })
				.attr("r", 1.5)
				.style("stroke", "none")
				.attr("title", function(d, i) {
					var category = d3.internal.title(ctx.categories[i], ctx.axes.y);
					return category + ": " + d3.internal.title(d.y, ctx.axes.y);
				})
				.each(d3.chart.tip);
		}

		renderer.init = function(def){
			var categories = def.categories;
			var min = NaN, max = NaN;
			var data = [];
			for (var i = 0; i < def.series.length; i++) {

				var series = def.data[i].map(function(pt) {
					// TODO support objects, functions
					return pt;
				});

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
				categories: categories,
				is_ordinal: true,
				min: min,
				max: max,
				data: data
			};
		};

		return renderer;
	};

})();
