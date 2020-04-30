const Promise = require('promise');
const fs = require('fs');
const path = require('path');
var FileInterface = require(path.join(process.cwd(), 'fileInterface.js'));
const fileInterface = new FileInterface();


var bonks = 0;
var loaded = false;

module.exports = {
    executeCommand: function(client, target, context, parameters) {
        if (!loaded) {
            const loadBonkPromise = fileInterface.readFromFile('bonks.txt');
            loaded = true;
        }
        bonks++;
        fileInterface.writeToFile('bonks.txt');
        client.say(target, String(context['display-name']) + ' Bonked! Chat has Bonked ' + String(bonks) + ' times!');
    }
}