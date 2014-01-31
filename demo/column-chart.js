(function(){

	var chart = {
		type: "column",
		axes: {
			x: {majorTicks: "outside"},
			y: {
				majorTicks: "outside",
				scalar: true,
				margin: true,
				grid: { major: true, minor: false }
			}
		},
		palette: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"],
		categories: [],
		series: {},
		title: {
			text: "Populations",
			position: "center"
		},
		legend: {
			position: "topright"
		}
	};

	$(function(){
		d3.csv("data/populations.csv", function(error, data){
			var rows = data.slice(1);
			chart.categories = rows.map(function(d){ return d.State; });

			var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "State"; });
			ageNames.forEach(function(key){
				chart.series[key] = rows.map(function(d){ return d[key]; });
			});

			$('body').trigger('chart-loaded', chart);
		});
	});
})();
