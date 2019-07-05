var server = require('./server');
var router = require('./router');
var requestHandler = require('./requestHandler');
var handles = {};

handles['/'] = requestHandler.start;
handles['/explorer'] = requestHandler.start;

handles['/search'] = requestHandler.search;
handles.getAddressTransactions = requestHandler.getAddressTransactions

function run() {
  server(router.route, handles);
}

module.exports = run;