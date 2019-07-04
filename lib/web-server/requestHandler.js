var util = require('util');
var blockchainRepo = require('./../blockchain-repo');

function start(response, queryString, postData) {
	
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(`
    <form action='/search' method='GET'>
      <input type='text' name='search' />
      <input type='submit' value='Search' />
    </form>
    `);
  response.end();
}

function search(response, queryString, postData) {
  var address = queryString.search;

  response.writeHead(301, { "Location": "http://" + response.host + '/' + address });
  delete response.host;
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