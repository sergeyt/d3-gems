// rendering of chart title
d3.chart.title = function(ctx) {

	var def = ctx.def.title;
	if (!def || !def.text) {
		return {
			element: null,
			height: 0
		};
	}

	var element = $('<div>')
		.addClass('title')
		.css('text-align', def.position || 'center')
		.text(def.text)
		.appendTo($(ctx.container));

	return {
		element: element,
		height: element.outerHeight()
	};
};
