var server = require('./server');
var router = require('./router');
var requestHandler = require('./request-handler');
var supportedCryptos = require('./../util/supported-cryptos');
var handles = {};

handles['/'] = requestHandler.start;
handles['/explorer'] = requestHandler.start;
handles['/search'] = requestHandler.search;

supportedCryptos.forEach(function (crypto) {
  handles['/' + crypto] = requestHandler.search;
})

handles.getAddressTransactions = requestHandler.getAddressTransactions;

function run() {
  server(router.route, handles);
}

module.exports = run;