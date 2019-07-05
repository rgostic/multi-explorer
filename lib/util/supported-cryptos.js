var fs = require('fs');

function _isJsFile(filename) {  
  if (filename.indexOf('.js') === filename.length - 3) {
    return true;
  }

  return false;
}

function getCryptos() {
  
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

module.exports = getCryptos;