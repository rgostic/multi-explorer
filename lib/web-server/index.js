var server = require('./server');
var router = require('./router');
var requestHandler = require('./request-handler');
var supportedCryptos = require('./../util/supported-cryptos');
var handles = {};

handles['/'] = requestHandler.start;
handles['/explorer'] = requestHandler.start;
handles['/search'] = requestHandler.search;
supportedCryptos().then(function (cryptos) {
    cryptos.forEach(function (crypto) {
    handles['/' + crypto] = requestHandler.search;
  });
});

function run() {
  server(router.route, handles);
}

module.exports = run;