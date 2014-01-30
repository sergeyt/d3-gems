(function(ns){

	if (typeof ns.axes === 'undefined') {
		ns.axes = {};
	}

	// initializes axes factories
	ns.axes.init = function(ctx){

		var def = ctx.def;
		var xaxis = {
			ticks: null,
			scalar: def.axes && def.axes.x && !!def.axes.x.scalar,
			is_time: ctx.categories.filter(_.isDate).length > 0,
			create: create_xaxis
		};

		var yaxis = {
			scale: create_yscale(ctx),
			create: create_yaxis
		};

		ctx.axes = {
			x: xaxis,
			y: yaxis
		};

		xaxis.scale = create_xscale(ctx, xaxis);
	};

	function create_xscale(ctx, xaxis){

		if (xaxis.scalar || xaxis.is_time) {
			return ns.scale.scalar(ctx);
		}

		if (ctx.is_ordinal) {
			return function(width) {
				return d3.scale.ordinal()
					.rangePoints([0, width])
					.domain(d3.range(0, ctx.categories.length));
			};
		}

		return function(width) {
			return ns.scale.ordinal(width, ctx.categories.length);
		};
	}

	function create_yscale(ctx){
		var config = ctx.def.axes.y;

		// taking into account axis min, max if specified
		if (config) {
			if ($.isNumeric(config.min)) {
				ctx.min = config.min;
			}
			if ($.isNumeric(config.max)) {
				ctx.max = config.max;
			}
		}

		return function(height) {
			return d3.scale.linear()
				.range([height, 0])
				.domain([ctx.min, ctx.max]);
		};
	}

	function create_xaxis(ctx, scale) {
		var axis = d3.svg.axis()
			.scale(scale || ctx.scales.x)
			.orient('bottom')
			.tickSize(3);

		var config = ctx.axes.x;
		if (config.ticks !== null) {
			if ($.isNumeric(config.ticks)) {
				axis.ticks(config.ticks);
			} else if ($.isArray(config.ticks)) {
				axis.ticks.apply(axis, config.ticks);
			}
		}

		return axis;
	}

	function create_yaxis(ctx, scale) {
		return d3.svg.axis()
			.scale(scale || ctx.scales.y)
			.orient('left')
			.tickSize(3);
	}

})(typeof f3 === 'undefined' ? window.f3 = {} : f3);
