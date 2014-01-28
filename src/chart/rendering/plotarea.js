(function(ns){
	if (typeof ns.chart === 'undefined'){
		ns.chart = {};
	}

	// creates plot area background
	ns.chart.plotarea = function(ctx){
		return ctx.canvas.append('rect')
			.attr('class', 'plotarea')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', ctx.width)
			.attr('height', ctx.height);
	};
})(typeof f3 === 'undefined' ? window.f3 = {} : f3);
