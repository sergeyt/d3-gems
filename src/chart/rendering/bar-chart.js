(function(ns){
	// rendering of bar charts
	ns.bar_chart = function(){

		function renderer(ctx){

			var x = ctx.scales.x;
			var y = ctx.scales.y;
			var group_width = calc_group_width(ctx);

			var x1 = d3.scale.ordinal()
				.domain(d3.range(0, ctx.series.length))
				.rangeRoundBands([0, group_width]);

			var min = ctx.min;
			var data = ctx.data;
			var height = ctx.height;
			var y0 = min < 0 ? y(0) : y(min);
			var h0 = height - y0;

			function translate_x(d, i) {
				return ctx.axes.x.scalar ? x(ctx.categories[i]) - group_width/2 : x(i);
			}

			var group = ctx.canvas.selectAll("g.colgroup")
				.data(data)
				.enter().append("g")
				.attr("class", "colgroup")
				.attr("transform", function(d, i) { return "translate(" + translate_x(d, i) + ",0)"; });

			var series = d3.map();
			group.selectAll("rect.bar")
				.data(function(d) { return d; })
				.enter().append("rect")
				.attr("data-series", function(d, i) { return i; })
				.classed("bar", true)
				.attr("x", function(d, i) { return x1(i); })
				.attr("y", function(d) { return d.y < 0 ? y0 : y(d.y); })
				.attr("width", x1.rangeBand())
				.attr("height", function(d) { return d.y < 0 ? y(d.y) - y0 : height - h0 - y(d.y); })
				.style("stroke", "none")
				.style("fill", function(d, i){ return ctx.color(i); })
				.each(ctx.tip)
				.each(ns.hightlight);
		}

		function calc_group_width(ctx){
			var x = ctx.scales.x;
			var xaxis = ctx.axes.x;
			if (xaxis.scalar) {
				var axis = xaxis.create(x);
				var ticks = ns.scale.ticks(x, axis);
				var tickCount = xaxis.is_time ? ticks.length + 1 : ticks.length;
				return ns.scale.ordinal(ctx.width, tickCount).rangeBand();
			} else {
				return x.rangeBand();
			}
		}

		renderer.init = function(ctx){
			var def = ctx.def;
			var min = NaN, max = NaN;
			var data = [];

			for (var i = 0; i < ctx.categories.length; i++) {
				var group = [];
				for (var j = 0; j < ctx.series.length; j++) {
					// TODO support objects with d, value fields
					var key = ctx.series[j];
					var val = def.series[key][i];
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
				data: data,
				min: min,
				max: max
			};
		};

		return renderer;
	};
})(typeof f3 === 'undefined' ? window.f3 = {} : f3);
