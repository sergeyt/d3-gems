(function(){

	var chart = {
		type: "area",
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
			text: "Area Chart",
			position: "center"
		},
		legend: {
			position: "topcenter"
		}
	};

	$(function(){
		// TODO load sample data

		$('body').trigger('chart-loaded', chart);
	});

})();
