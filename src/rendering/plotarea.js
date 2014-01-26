// creates plot area background
d3.chart.plotarea = function(ctx){
	return ctx.canvas.append('rect')
		.attr('class', 'plotarea')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', ctx.width)
		.attr('height', ctx.height);
};
