var util = require('util');
var blockchainRepo = require('./../blockchain-repo');
var supportedCryptos = require('./../util/supported-cryptos');

function start(response, queryString, postData) {
	
  response.writeHead(200, {'Content-Type': 'text/html'});

  response.write(`
    <form action='/search' method='GET'>
      <input type='text' name='address' />
      <input type='submit' value='Search' />
      <select name='cryptoId'>
    `);  

  supportedCryptos().then(function (cryptos) {
    console.dir(cryptos);
    var cryptoOptions = '';

    cryptos.forEach(function(crypto) {
      cryptoOptions += '<option value="' + crypto + '">' + crypto + '</option>';
    });

    response.write(cryptoOptions);
  
    response.write('</select>');

    response.write('</form>');
    response.end();
  });
}

function search(response, queryString, postData) {
  var address = queryString.address;
  var cryptoId = queryString.cryptoId;

  response.writeHead(302, { "Location": "http://" + response.host + '/' + address });
  
  response.end();
}

function getAddressTransactions(response, postData, address) {
	var html = '';
  
  blockchainRepo.eth(address).then(function (transactions) {

    transactions.forEach(function (tx) {
        html += '<p>Transaction Hash: ' + tx.hash + '</p>';
      });

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(html);
    response.end();
  });  
}

module.exports = {
	start,
  search,
  getAddressTransactions
}