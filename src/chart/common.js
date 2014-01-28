(function(ns){

	ns.title_attr = function(value, axis) {
		var format = axis ? axis.format || 'g' : 'g';
		return Globalize.format(value, format);
	};

	// String formatting in .NET style. Only simple textual replaces are supported.
	ns.format = function() {
		var args = arguments;
		return args[0].replace(/{(\d+)}/g, function(m, i) {
			var index = (+i)+1;
			return index < args.length ? args[index] : "";
		});
	};
})(typeof f3 === 'undefined' ? window.f3 = {} : f3);
