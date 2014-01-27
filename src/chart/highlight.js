d3.behavior.hightlight = function(){
	d3.select(this)
		.style('opacity', 0.75)
		.on('mouseover.highlight', function(){
			// TODO with transition?
			d3.select(this).style('opacity', 0.95);
		})
		.on('mouseout.highlight', function(){
			// TODO with transition?
			d3.select(this).style('opacity', 0.75);
		});
};
