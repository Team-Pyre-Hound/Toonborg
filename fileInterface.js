const Promise = require('promise');
const path = require('path');
const fs = require('fs');

var FileInterface = function() {
    this._asyncReadFile = Promise.denodeify(require('fs').readFile);
    this._asyncWriteFile = Promise.denodeify(require('fs').writeFile);
}

FileInterface.prototype.writeToFile = function(filePath, content) {
    this._asyncWriteFile(path.join(process.cwd(), filePath), content)
        .catch(function(error){console.error(error);})
        .done(); 
}

FileInterface.prototype.readFromFile = function(filePath, callback) {
    this._asyncReadFile(filePath, 'utf8')
        .then(callback)
        .catch(function(error){console.error(error);});
}

module.exports = FileInterface;