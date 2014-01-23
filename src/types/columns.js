(function(){

	d3.chart.columns = function(){

		function renderer(canvas, ctx){

			var def = ctx.def;
			var x = ctx.scales.x;
			var y = ctx.scales.y;
			var groupWidth = calc_group_width(ctx);

			var x1 = d3.scale.ordinal()
				.domain(d3.range(0, def.series.length))
				.rangeRoundBands([0, groupWidth]);

			var height = ctx.height;
			var y0 = min < 0 ? y(0) : y(min);
			var h0 = height - y0;

			function translateX(d, i) {
				return ctx.xaxis.scalar ? x(ctx.categories[i]) - groupWidth/2 : x(i);
			}

			// title attr generator
			var title = d3.internal.title;

			var group = canvas.selectAll("g.colgroup")
				.data(data)
				.enter().append("g")
				.attr("class", "colgroup")
				.attr("transform", function(d, i) { return "translate(" + translateX(d, i) + ",0)"; });

			var series = d3.map();
			group.selectAll("rect.bar")
				.data(function(d) { return d; })
				.enter().append("rect")
				// .attr("class", function(d, i) { return palette_entry(i); })
				.classed("bar", true)
				.attr("x", function(d, i) { return x1(i); })
				.attr("y", function(d) { return d.y < 0 ? y0 : y(d.y); })
				.attr("width", x1.rangeBand())
				.attr("height", function(d) { return d.y < 0 ? y(d.y) - y0 : height - h0 - y(d.y); })
				.style("stroke", "none")
				.attr("title", function(d) {
					var category = title(ctx.categories[d.x], ctx.xaxis);
					return category + ": " + title(d.y, ctx.yaxis);
				})
				.each(tip)
				.each(function (d, i) {
					if (series.has(i)) return;
					series.set(i, true);
					// processLegend('fill').call(this, d, i);
				});
		}

		function calc_group_width(ctx){
			var x = ctx.scales.x;
			if (ctx.xaxis.scalar) {
				var axis = ctx.xaxis.create(x);
				var ticks = d3.internal.scale_ticks(x, axis);
				var tickCount = ctx.xaxis.is_time ? ticks.length + 1 : ticks.length;
				return d3.internal.ordinal_scale(ctx.width, tickCount).rangeBand();
			} else {
				return x.rangeBand();
			}
		}

		renderer.init = function(def){
			// TODO support function for def.categories
			var categories = def.categories;
			var min = NaN, max = NaN;
			var data = [];

			for (var i = 0; i < categories.length; i++) {
				var group = [];
				for (var j = 0; j < scope.series.length; j++) {
					// TODO support objects with d, value fields
					var val = scope.data[j][i];
					group.push({ x: i, y: val });
					if (isNaN(min)) {
						min = val;
						max = val;
					} else {
						min = Math.min(min, val);
						max = Math.max(max, val);
					}
				}
				data.push(group);
			}

			if (min > 0) {
				// reduce min on 20% to avoid invisible bars
				min -= max == min ? 0.2 * max : 0.2 * (max - min);
			}

			return {
				is_ordinal: true,
				categories: categories,
				data: data,
				min: min,
				max: max
			};
		};

		return renderer;
	};

})();
