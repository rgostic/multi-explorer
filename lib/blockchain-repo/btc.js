var request = require('request');

function getAddressTransactions(address) {
  let transactionUrl = 'https://chain.so/api/v2/get_tx_received/BTC/' + address;

  return new Promise(function (resolve, object) {
      request.get(transactionUrl, function (err, resp, body) {
        console.log('error: ' + err);
        if (err) {
          console.log('btc error: ' + err);
          reject(err);
        }
        else {
          resolve(JSON.parse(body).data.txs);
        }        
    });
  });
}


module.exports = getAddressTransactions;