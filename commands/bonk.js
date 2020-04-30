const path = require('path');
var FileInterface = require(path.join(process.cwd(), 'fileInterface.js'));
const fileInterface = new FileInterface();


var bonks = 0;
var loaded = false;

function add(client, target, context) {
    bonks++;
    fileInterface.writeToFile('bonks.txt', bonks);
    client.say(target, String(context['display-name']) + ' Bonked! Chat has Bonked ' + String(bonks) + ' times!');
}

module.exports = {
    executeCommand: function(client, target, context, parameters) {
        if (!loaded) {
            var callback = function(res) {
                bonks = parseInt(res);
                add(client, target, context);
            }
            fileInterface.readFromFile('bonks.txt', callback);
            loaded = true;
        } else {
            add(client, target, context);
        }
    }
}