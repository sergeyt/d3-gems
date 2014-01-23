// common utilities
(function(){
	// creates plot area background
	d3.chart.plotarea = function(canvas, width, height){
		return canvas.append('rect')
			.attr('class', 'plotarea')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', width)
			.attr('height', height);
	};
})();
