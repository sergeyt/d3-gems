// axes rendering
(function(ns){

	if (typeof ns.axes === 'undefined') {
		ns.axes = {};
	}

	// extends axis config
	function axis_config(config){
		return $.extend({}, config, {
			// TODO support functions
			title: function() {
				return config.title && config.title.text ? config.title.text : "";
			},

			format: function() {
				if (config.format) {
					return function(v) {
						return Globalize.format(v, config.format);
					};
				}
				return null;
			}
		});
	}

	// rendering of axes
	ns.axes.render = function(ctx) {

		var def = ctx.def;
		var bottom = ctx.height;

		var xconfig = axis_config(def.axes.x);
		var yconfig = axis_config(def.axes.y);

		var xaxis = ctx.axes.x.create(ctx);
		var yaxis = ctx.axes.y.create(ctx);

		xaxis.tickFormat(function(d, i) {
			var f = xconfig.format() || String;
			var v = xconfig.scalar ? d : ctx.categories[i];
			return f(v);
		});

		var format = yconfig.format();
		if (format) yaxis.tickFormat(format);

		var xview = ctx.canvas.append('g')
			.attr('class', 'axis xaxis')
			.attr("transform", 'translate(0,' + bottom + ')')
			.call(xaxis);

		var yview = ctx.canvas.append('g')
			.attr('class', 'axis yaxis')
			.call(yaxis);

		arrange_category_axis(ctx, xaxis, xview);

		// x axis title
		var text = xconfig.title();
		if (text) {
			xview.append('text')
				.attr('class', 'title')
				.attr('transform', 'translate(' + ctx.width + ',0)')
				.attr('y', 6)
				.attr('dy', '-0.75em')
				.style('text-anchor', 'end')
				.text(text);
		}

		// y axis title
		text = yconfig.title();
		if (text) {
			yview.append('text')
				.attr('class', 'title')
				.attr('transform', 'rotate(-90)')
				.attr('y', 3)
				.attr('dy', '.75em')
				.style('text-anchor', 'end')
				.text(text);
		}

		var xbox = xview.node().getBBox();
		var ybox = yview.node().getBBox();

		return {
			width: ybox.width,
			height: xbox.height,
			views: {
				x: xview,
				y: yview
			}
		};
	};

	function arrange_category_axis(ctx, axis, view) {

		var scale = ctx.scales.x;

		var categories = ctx.categories;
		var labels = view.selectAll('text');
		if (labels.length === 0 || categories.length < 2) return;

		var bounds = labels[0].map(function(e) { return e.getBBox(); });
		var maxWidth = d3.max(bounds, function (r){ return r.width; });
		var step;
		if (ctx.axes.x.scalar) {
			var ticks = ns.scale.ticks(scale, axis);
			step = Math.abs(scale(ticks[1]) - scale(ticks[0]));
		} else {
			step = Math.abs(scale(1) - scale(0));
		}

		if (maxWidth <= step) return;

		// measure ellipsis
		var ellipsis = view.append('text').text("...");
		var ellipsisWidth = ellipsis.node().getBBox().width;
		ellipsis.remove();

		maxWidth = step * 2 - 6 - ellipsisWidth;
		var labelHeight = d3.max(bounds, function(r) { return r.height; });

		// stagger strategy with trimming
		labels.each(function(d, i) {
			var label = d3.select(this);
			var h = i & 1 ? labelHeight : 0;
			label.attr("transform", "translate(0, " + h + ")");
			trim_label(this, maxWidth);
		});
	}

	function trim_label(label, maxWidth) {
		var wrapper = d3.select(label);
		var text = wrapper.text();
		var n = 1;
		while (n < text.length && label.getSubStringLength(0, n) <= maxWidth) {
			n++;
		}
		if (n < text.length) {
			wrapper.text(text.substr(0, n - 1) + "...");
		}
	}

})(typeof f3 === 'undefined' ? window.f3 = {} : f3);
