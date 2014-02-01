(function(ns){

	// temporary renders axes to measure them
	ns.axes.measure = function(ctx){
		var layout = ctx.layout;

		var svg = d3.select(ctx.container)
			.append('svg')
			.style('display', 'block')
			.attr('width', layout.width)
			.attr('height', layout.height);

		// init scales
		ns.chart.plot().init(ctx);
		ctx.canvas = svg.append('g');

		var axes = ns.axes.render(ctx);

		var label = axes.views.x.select('text').node();

		layout.margin.top += d3.round(label.getBBox().height / 2);
		layout.margin.left += axes.width;
		layout.margin.bottom += axes.height;

		svg.remove();
	};

})(typeof f3 === 'undefined' ? window.f3 = {} : f3);
