(function(ns){

	var dateClass = '[object Date]';

	// Determines if given value is a date.
	ns.isDate = function(value) {
		return value && typeof value == 'object' && toString.call(value) == dateClass;
	};

	// TODO inline to axes module
	ns.title_attr = function(value, axis) {
		var format = axis ? axis.format || 'g' : 'g';
		return ns.format(value, format);
	};

	ns.format = function(value, format){
		if (value === undefined){
			return '';
		}
		if (typeof format == 'function'){
			return format(value);
		}
		if (typeof value == 'number'){
			var fn = d3.format(format);
			return fn(value);
		}
		if (ns.isDate(value)){
			// TODO support .NET format strings, convert them to d3.time equivalents
			var f = d3.time.format(format || '%y-%m-%d');
			return f(value);
		}
		return String(value);
	};

	// String formatting in .NET style. Only simple textual replaces are supported.
	ns.sformat = function() {
		var args = arguments;
		return args[0].replace(/{(\d+)}/g, function(m, i) {
			var index = (+i)+1;
			return index < args.length ? args[index] : "";
		});
	};
})(typeof f3 === 'undefined' ? window.f3 = {} : f3);
