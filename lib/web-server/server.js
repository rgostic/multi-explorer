var http = require('http');
var url = require('url');
var sys = require('sys');

function parseQueryString(query) {
	var queryString = {};

	if (query !== undefined && query !== null) {
			var params = query.split('&');

			var queryString = {};
			params.forEach(function(param) {
				var kv = param.split('=');
				queryString[kv[0]] = kv[1];
			});			
		}

	return queryString;
}

function start(route, handles) {
	function onRequest(request, response) {
		console.log();
		console.log('req received');
		var path = url.parse(request.url).pathname;
		var query = url.parse(request.url).query;
		var postData = '';		
		var queryString = parseQueryString(query);

		request.setEncoding('utf8');

		request.addListener('data', function(postDataChunk) {
			postData += postDataChunk;
			console.log('received chunk');
			postDataChunk + "'.";
		});

		// TODO: figure out where to find hostname in response object
		response.host = request.headers['host'];

		request.addListener('end', function() {
			route(handles, path, queryString, response, postData);
		});		
	}

	http.createServer(onRequest).listen(8888);
	
	console.log('server started');
}


module.exports = start;

// console.log(module);