var util = require('util');
var fs = require('fs');
var blockchainRepo = require('./../blockchain-repo');

function _isJsFile(filename) {  
  if (filename.indexOf('.js') === filename.length - 3) {
    return true;
  }

  return false;
}

function _getCryptos() {
  
  return new Promise(function (resolve, object) {
    var cryptos = [];

    fs.readdir('/mnt/c/dev/JS/repos/multi-explorer/lib/blockchain-repo', function(err, files) {

      if (err) {
        reject(err);
      }

      files.forEach(function(filename) {
        if (_isJsFile(filename)) {
          
          if (filename !== 'index.js') {
            console.log('adding file: ' + filename);
            cryptos.push(filename.replace('.js', '').toUpperCase());
          }
        }
      });
      resolve(cryptos);  
    });

    
  });
}



function start(response, queryString, postData) {
	
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(`
    <form action='/search' method='GET'>
      <input type='text' name='address' />
      <input type='submit' value='Search' />
      <select name='cryptoId'>
    `);  

  _getCryptos().then(function (cryptos) {
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
  response.writeHead(301, { "Location": "http://" + response.host + '/' + address });
  delete response.host;
  response.end();
}

function getAddressTransactions(response, postData,address) {
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