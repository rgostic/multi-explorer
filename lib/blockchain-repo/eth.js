var request = require('request');

function getAddressTransactions(address) {
  let transactionUrl = 'http://api.etherscan.io/api?module=account&action=txlist&address=' + 
                        address +
                        '&startblock=0&endblock=99999999&sort=desc';

  return new Promise(function (resolve, object) {
      request.get(transactionUrl, function (err, resp, body) {
        console.log('error: ' + err);
        if (err) {
          reject(err);
        }
        else {
          resolve(JSON.parse(body).result);
        }        
    });
  });
}


module.exports = getAddressTransactions;