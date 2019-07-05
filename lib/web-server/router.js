
function route(handles, pathName, queryString, response, postData) {
	console.log('routing path for ' + pathName);
	if (typeof handles[pathName] === 'function') {
		return handles[pathName](response, queryString, postData);
	}  
	else {
		console.log('no handler found for ' + pathName);
		return "404 not found";
	}
}

exports.route = route