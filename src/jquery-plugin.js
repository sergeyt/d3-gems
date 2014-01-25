// jquery integration
(function(){

	// adds chart under each selected elements in the jquery set.
	$.fn.chart = function(chartProvider) {

		if (chartProvider === undefined){
			chartProvider = function(e){
				var data = $(e).data('chart');
				if (typeof data === 'string'){
					return window.__charts__[data];
				}
				if (typeof data === 'object'){
					return data;
				}
				// TODO stub chart when no chart definition
				return {
					data: []
				};
			};
		}

		return this.each(function() {
			var $this = $(this);
			var width = $this.width();
			var height = $this.height();

			var chart = d3.chart()
				.width(width)
				.height(height);

			var def = typeof(chartProvider) == 'function' ? chartProvider(this) : chartProvider;

			d3.select(this)
				.data([def])
				.call(chart);
		});
	};

})();
