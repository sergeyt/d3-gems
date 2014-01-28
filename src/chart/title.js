(function(ns){
	if (typeof ns.chart === 'undefined'){
		ns.chart = {};
	}

	// rendering of chart title
	ns.chart.title = function(ctx) {

		var def = ctx.def.title;
		if (!def || !def.text) {
			return {
				element: null,
				height: 0
			};
		}

		var element = $('<div class="title">')
			.css('text-align', def.position || 'center')
			.text(def.text)
			.appendTo($(ctx.container));

		return {
			element: element,
			height: element.outerHeight()
		};
	};
})(typeof f3 === 'undefined' ? window.f3 = {} : f3);
