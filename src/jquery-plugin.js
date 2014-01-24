// jquery integration
(function(){

	// adds chart under each selected elements in the jquery set.
	$.fn.chart = function(chartProvider) {

		if (chartProvider === undefined){
			chartProvider = function(e){
				// TODO stub chart when no chart definition
				var name = $(e).data('chart');
				return window.__charts__[name];
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
