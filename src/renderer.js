(function(){

	// factory to create chart renderer
	d3.chart.renderer = function(def){
		// TODO handle subtype if needed
		var type = (def.type || 'column').toLowerCase();
		switch (type) {
			case 'line':
				return d3.chart.lines();
			default:
				return d3.chart.columns();
		}
	};

})();
