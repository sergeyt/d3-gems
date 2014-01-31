(function(){
	var chart = {
		type: "line",
		axes: {
			x: { majorTicks: "outside" },
			y: {
				majorTicks: "outside",
				scalar: true,
				margin: true,
				grid: { major: true, minor: false }
			}
		},
		categories: ["A", "B", "A"],
		series: {
			Revenue: [90, 70, 95],
			Units: [55, 80, 67]
		},
		title: {
			text: "Line Chart",
			position: "center"
		},
		legend: {
			position: "bottomcenter"
		}
	};

	$(function(){

		// TODO load better sample data

		$('body').trigger('chart-loaded', chart);
	});
})();
