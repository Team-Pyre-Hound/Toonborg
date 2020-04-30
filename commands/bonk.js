const path = require('path');
var FileInterface = require(path.join(process.cwd(), 'fileInterface.js'));
const fileInterface = new FileInterface();


var bonks = 0;
var isLoaded = false;

function add(client, target, context) {
    bonks++;
    fileInterface.writeToFile('bonks.txt', bonks);
    client.say(target, String(context['display-name']) + ' Bonked! Chat has Bonked ' + String(bonks) + ' times!');
}

module.exports = {
    executeCommand: function(client, target, context, parameters) {
        if (!isLoaded) {
            var callback = function(res) {
                bonks = parseInt(res);
                add(client, target, context);
            }
            fileInterface.readFromFile('bonks.txt', callback);
            isLoaded = true;
        } else {
            add(client, target, context);
        }
    }
}