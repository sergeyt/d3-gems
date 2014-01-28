(function(ns){

	if (typeof ns.chart === 'undefined'){
		ns.chart = {};
	}

	// renders svg - chart body
	ns.chart.render_body = function(ctx){
		var layout = ctx.layout;
		var is_bottom_legend = ctx.legend.position.indexOf('bottom') == 0;

		d3.select(ctx.container).selectAll('svg').remove();

		var selection = d3.select(ctx.container).selectAll('svg')
			.data([ctx]).enter();

		var svg = is_bottom_legend ? selection.insert('svg', '.legend') : selection.append('svg');

		svg.style('display', 'block')
			.attr('width', layout.width)
			.attr('height', layout.height);

		// init tip function
		ctx.svg = svg;
		ctx.tip = ns.chart.tip(ctx);

		var plot = ns.chart.plot()
			.width(layout.width - layout.margin.left - layout.margin.right)
			.height(layout.height - layout.margin.top - layout.margin.bottom);

		// append and render plotarea
		svg.append('g')
			.attr('transform', 'translate(' + layout.margin.left + ',' + layout.margin.top + ')')
			.call(plot);

		return svg[0];
	};

})(typeof f3 === 'undefined' ? window.f3 = {} : f3);
