// common utilities
(function(){

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

	// creates plot area background
	d3.chart.plotarea = function(canvas, width, height){
		return canvas.append('rect')
			.attr('class', 'plotarea')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', width)
			.attr('height', height);
	};

})();
