(function(ns){
	// rendering of cumulative flow diagram based on area charts
	ns.cumulative_flow_diagram = function(){

		var area_chart = ns.area_chart();

		function renderer(ctx){
			return area_chart(ctx);
		}

		renderer.init = function(ctx){

			var def = ctx.def;

			var count = 0;
			if (Array.isArray(def.series)){
				count = def.series.length;
				// TODO accumulate task counts
				var hash = {};
				var keys = null;
				def.series.forEach(function(it){
					if (!keys){
						keys = Object.keys(it);
					}
					keys.forEach(function(key){
						var val = it[key];
						var arr = hash[key] || (hash[key] = []);
						arr.push(val);
					});
				});
				def.series = hash;
			} else {
				count = def.series[Object.keys(def.series)[0]].length;
			}

			// init dates if they are undefined
			if (!ctx.categories){
				// TODO display only first date
//				var start_date = def.start || today();
//				var dates = [];
//				for (var i = 0; i < count; i++){
//					dates.push(start_date);
//					start_date = new Date(start_date);
//					start_date.setDate(start_date.getDate() + 1);
//				}
//				ctx.categories = dates;
				ctx.categories = d3.range(1, count + 1);
				ctx.period = {step: 'day'};
			}

			return area_chart.init(ctx);
		};

		function today(){
			var d = new Date();
			return new Date(d.getFullYear(), d.getMonth(), d.getDate());
		}

		return renderer;
	};
})(typeof f3 === 'undefined' ? window.f3 = {} : f3);
