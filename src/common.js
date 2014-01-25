// common utilities
d3.internal = {
	scale_ticks: function(scale, axis) {
		return scale.ticks ? scale.ticks.apply(scale, axis.ticks()) : scale.domain();
	},
	ordinal_scale: function (width, length) {
		return d3.scale.ordinal()
			.rangeRoundBands([0, width], 0.1)
			.domain(d3.range(0, length));
	}
};

// TODO consider to rename to titleAttr
d3.internal.title = function(value, axis) {
	var format = axis ? axis.format || 'g' : 'g';
	return Globalize.format(value, format);
};

// String formatting in .NET style. Only simple textual replaces are supported.
d3.internal.format = function() {
	var args = arguments;
	return args[0].replace(/{(\d+)}/g, function(m, i) {
		var index = (+i)+1;
		return index < args.length ? args[index] : "";
	});
};
