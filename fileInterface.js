const Promise = require('promise');
const path = require('path');
const fs = require('fs');

var FileInterface = function() {
    this._asyncReadFile = Promise.denodeify(require('fs').readFile);
    this._asyncWriteFile = Promise.denodeify(require('fs').writeFile);
}

FileInterface.prototype.writeToFile = function(filePath, content, failCallback) {
    this._asyncWriteFile(path.join(process.cwd(), filePath), content)
        .catch(failCallback)
        .done(); 
}

FileInterface.prototype.readFromFile = function(filePath, callback, failCallback) {
    this._asyncReadFile(filePath, 'utf8')
        .then(callback)
        .catch(failCallback);
}

module.exports = FileInterface;