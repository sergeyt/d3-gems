(function(){
	var chart = {
		type: "cfd",
		axes: {
			x: { majorTicks: "outside" },
			y: {
				majorTicks: "outside",
				scalar: true,
				margin: true,
				grid: { major: true, minor: false }
			}
		},
		// TODO support as hash object where each key is status, value is array of task counts per day
		series: [
			// TODO accumulate in renderer, each day has only new number of tasks in given status
//			{ active: 10, doing: 0, review: 0, test: 0, done: 0},
//			{ active: 8, doing: 2, review: 0, test: 0, done: 0},
//			{ active: 6, doing: 2, review: 2, test: 0, done: 0},
//			{ active: 5, doing: 2, review: 1, test: 2, done: 0},
//			{ active: 4, doing: 2, review: 2, test: 0, done: 2},
//			{ active: 3, doing: 2, review: 1, test: 2, done: 2},
//			{ active: 2, doing: 1, review: 1, test: 2, done: 4},
//			{ active: 0, doing: 2, review: 1, test: 1, done: 6},
//			{ active: 0, doing: 0, review: 0, test: 2, done: 8},
//			{ active: 0, doing: 0, review: 0, test: 0, done: 10}
			{ active: 10, doing: 0, review: 0, test: 0, done: 0},
			{ active: 10, doing: 2, review: 0, test: 0, done: 0},
			{ active: 10, doing: 4, review: 2, test: 0, done: 0},
			{ active: 10, doing: 5, review: 3, test: 2, done: 0},
			{ active: 10, doing: 7, review: 5, test: 2, done: 2},
			{ active: 10, doing: 8, review: 6, test: 4, done: 2},
			{ active: 10, doing: 9, review: 7, test: 6, done: 4},
			{ active: 10, doing: 10, review: 8, test: 7, done: 6},
			{ active: 10, doing: 10, review: 9, test: 9, done: 8},
			{ active: 10, doing: 10, review: 10, test: 10, done: 10}
		],
		title: {
			text: "Cumulative Flow Diagram",
			position: "center"
		},
		legend: {
			position: "topright"
		}
	};

	$(function(){
		// TODO load better sample data

		$('body').trigger('chart-loaded', chart);
	});
})();
