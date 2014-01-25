(function(){

	// tooltip function factory
	d3.chart.tip = function(ctx) {

		function series_index(){
			var $this = $(this);
			var series = $this.data('series');
			if (series !== undefined){
				var i = parseInt(series);
				return isNaN(i) ? undefined : i;
			}
			series = $this.parent('g[data-series]').data('series');
			if (series !== undefined){
				var i = parseInt(series);
				return isNaN(i) ? undefined : i;
			}
			return undefined;
		}

		// TODO allow usage of custom tooltips like jquery tipsy
		// init d3-tip (only once)
		var tip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function(d) {
				var series = series_index.call(this);
				var label = ctx.def.series[series];
				label = label ? d3.internal.format("<strong>{0}:</strong> ", label) : '';
				var val = d3.internal.title(d.y, ctx.def.axes.y);
				var template = "{0}<span style='color:red'>{1}</span>";
				return d3.internal.format(template, label, val);
			});

		ctx.svg.call(tip);

		return function(){
			/* Show and hide tip on mouse events */
			d3.select(this)
				.on('mouseover', tip.show)
				.on('mouseout', tip.hide);
		};
	};

})();
