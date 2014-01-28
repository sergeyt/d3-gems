(function(ns){

	if (typeof ns.scale === 'undefined'){
		ns.scale = {};
	}

	// common utilities
	ns.scale.ticks = function(scale, axis) {
		return scale.ticks ? scale.ticks.apply(scale, axis.ticks()) : scale.domain();
	};

	ns.scale.ordinal = function (width, length) {
		return d3.scale.ordinal()
			.rangeRoundBands([0, width], 0.1)
			.domain(d3.range(0, length));
	};

})(typeof f3 === 'undefined' ? window.f3 = {} : f3);
