(function(ns){

	if (typeof ns.chart === 'undefined'){
		ns.chart = {};
	}

	// factory to create chart renderer
	ns.chart.renderer = function(def){
		// TODO handle subtype if needed
		var type = (def.type || 'column').toLowerCase();
		switch (type) {
			case 'line':
				return ns.line_chart();
			case 'area':
				return ns.area_chart();
			case 'cfd':
			case 'cumulative-flow-diagram':
				return ns.cumulative_flow_diagram();
			default:
				return ns.bar_chart();
		}
	};
})(typeof f3 === 'undefined' ? window.f3 = {} : f3);
