// create factory for scalar scale
d3.chart.scalar_scale = function(ctx) {

	// returns configuration (arguments) for time.scale.ticks
	function time_ticks(vals) {
		if (ctx.period && ctx.period.step) {
			switch (ctx.period.step.toLowerCase()) {
				case 'day': return [d3.time.days, 1];
				case 'month': return [d3.time.months, 1];
				case 'quarter': return [d3.time.months, 3];
				case 'year': return [d3.time.years, 1];
				case 'hour': return [d3.time.hours, 1];
				case 'minute': return [d3.time.minutes, 1];
				case 'second': return [d3.time.seconds, 1];
			}
		}
		return vals.length;
	}

	function time_scale(axis, width, vals) {
		if (ctx.period) {
			vals = vals.concat([ctx.period.min, ctx.period.max].filter(_.isDate));
		}
		axis.ticks = time_ticks(vals);
		var extent = d3.extent(vals);
		return d3.time.scale()
			.rangeRound([0, width])
			.domain(extent);
	}

	function create(axis, width, vals) {
		if (axis.is_time) {
			return time_scale(width, vals);
		}
		return d3.scale.linear()
			.rangeRound([0, width])
			.domain(d3.extent(vals));
	}

	function add(axis, tick, interval) {
		return axis.is_time ? new Date(Number(tick) + interval) : tick + interval;
	}

	return function(width) {
		var axis_config = ctx.axes.x;
		var scale = create(width, ctx.categories);
		if (ctx.is_ordinal || axis_config.is_time) {
			var axis = axis_config.create(ctx, scale);
			var vals = d3.internal.scale_ticks(scale, axis);
			var interval = vals[1] - vals[0];
			var cats = ctx.categories.slice();
			cats.splice(0, 0, add(vals[0], -interval * 0.9));
			if (ctx.is_ordinal) {
				cats.push(add(axis_config, vals[vals.length - 1], interval * 0.8));
			}
			return create(axis_config, width, cats);
		}
		return scale;
	};
};
