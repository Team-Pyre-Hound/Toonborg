const Promise = require('promise');
const fs = require('fs');

var asyncReadFile = Promise.denodeify(require('fs').readFile);
var asyncWriteFile = Promise.denodeify(require('fs').writeFile);
var bonks;
var loaded = false;

module.exports = {
    executeCommand: function(client, target, context, parameters) {
        if (!loaded) {
            const loadBonkPromise = asyncReadFile('bonks.txt', 'utf8')
                                        .then(function(res) {bonks = parseInt(res)})
                                        .catch(function(error) {
                                            console.error(error);
                                        });
            loaded = true;
        }
        bonks++;
        asyncWriteFile('bonks.txt', bonks).catch(function(error){console.error(error);}).done();
        client.say(target, String(context['display-name']) + ' Bonked! Chat has Bonked ' + String(bonks) + ' times!');
    }
}