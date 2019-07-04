
function route(handles, pathName, queryString, response, postData) {
	console.log('routing path for ' + pathName);
	if (typeof handles[pathName] === 'function') {
		return handles[pathName](response, queryString, postData);
	}
  else if (pathName.length === 43) {
    console.log(pathName);
    return handles.getAddressTransactions(response, postData, pathName.replace(/^\/+/g, ''));
  }
	else {
		console.log('no handler found for ' + pathName);
		return "404 not found";
	}
}

exports.route = route