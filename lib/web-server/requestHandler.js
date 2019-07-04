var request = require('request');
var util = require('util');
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
	
  response.writeHead(200, {'Content-Type': 'text/html'});
  let transactionUrl = 'http://api.etherscan.io/api?module=account&action=txlist&address=' + address + '&startblock=0&endblock=99999999&sort=desc';
  request.get(transactionUrl, function (err, resp, body) {
  	console.log('error: ' + err);
  	let transactions = JSON.parse(body).result;
  	var html = '';
  	transactions.forEach(function (tx) {
  		html += '<p>Transaction Hash: ' + tx.hash + '</p>';
  	});
  	response.write(html);
  	response.end();
  });
}

module.exports = {
	start,
  search,
  getAddressTransactions
}