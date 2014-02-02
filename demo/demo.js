$(function(){

	var charts = ko.observable([]);
	var viewModel = {
		charts: charts,
		select_chart: function(title){
			var chart = charts().filter(function(c){
				return c.title.text == title;
			});
			$('.host').html('');
			$('<div class="chart outlined"/>')
				.appendTo($('.host'))
				.data('chart', chart[0])
				.chart();
		}
	};

	$('body').on('chart-loaded', function(event, chart){
		var arr = charts();
		arr.push(chart);
		charts(arr);
	});

	ko.applyBindings(viewModel);
});
