d3.behavior.hightlight = function(){
	d3.select(this)
		.style('opacity', 0.75)
		.on('mouseover.highlight', function(){
			d3.select(this)
				.transition()
				.duration(100)
				.style('opacity', 0.95);
		})
		.on('mouseout.highlight', function(){
			d3.select(this)
				.transition()
				.duration(100)
				.style('opacity', 0.75);
		});
};
