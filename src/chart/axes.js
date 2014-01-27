(function(){

	// initializes axes factories
	d3.chart.axes = function(ctx){

		var def = ctx.def;
		var xaxis = {
			ticks: null,
			scalar: def.xaxis && !!def.xaxis.scalar,
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
			return d3.chart.scalar_scale(ctx);
		}

		if (ctx.is_ordinal) {
			return function(width) {
				return d3.scale.ordinal()
					.rangePoints([0, width])
					.domain(d3.range(0, ctx.categories.length));
			};
		}

		return function(width) {
			return d3.internal.ordinal_scale(width, ctx.categories.length);
		};
	}

	function create_yscale(ctx){
		var def = ctx.def;

		// taking into account axis min, max if specified
		if (def.yaxis) {
			if ($.isNumeric(def.yaxis.min)) {
				ctx.min = def.yaxis.min;
			}
			if ($.isNumeric(def.yaxis.max)) {
				ctx.max = def.yaxis.max;
			}
		}

		return function(height) {
			return d3.scale.linear()
				.range([height, 0])
				.domain([ctx.min, ctx.max]);
		};
	}

	function create_xaxis(ctx) {
		var axis = d3.svg.axis()
			.scale(ctx.scales.x)
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

	function create_yaxis(ctx) {
		return d3.svg.axis()
			.scale(ctx.scales.y)
			.orient('left')
			.tickSize(3);
	}

})();
