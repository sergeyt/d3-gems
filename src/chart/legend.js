(function(ns){
	if (typeof ns.chart === 'undefined'){
		ns.chart = {};
	}

	// rendering of chart legend
	ns.chart.legend = function(ctx){
		d3.select(ctx.container).selectAll('div.legend').remove();

		var def = ctx.def.legend || {};
		var position = (def.position || 'topright').toLowerCase();

		var div = d3.select(ctx.container)
			.append('div')
			.classed('legend', true)
			.attr('data-position', position);

		var item = item_renderer(ctx);

		var range = d3.range(0, ctx.series.length);
		div.selectAll('div.item')
			.data(range).enter()
			.append('div')
			.each(item);

		var $e = $(div[0]);

		return {
			element: $e[0],
			height: $e.outerHeight(),
			position: position
		};
	};

	// creates item renderer
	function item_renderer(ctx){
		return function(){
			var elem = d3.select(this)
				.classed('item', true);

			var nbsp = String.fromCharCode(160);
			elem.append('span')
				.style('background-color', function(i){ return ctx.color(i); })
				.text(nbsp  + nbsp);

			elem.append('span').text(nbsp);

			elem.append('span')
				.text(function(i){
					return ctx.series[i];
				});

			return elem;
		};
	}

})(typeof f3 === 'undefined' ? window.f3 = {} : f3);
