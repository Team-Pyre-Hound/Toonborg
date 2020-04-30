
const path = require('path');
var FileInterface = require(path.join(process.cwd(), 'fileInterface.js'));
const fileInterface = new FileInterface();

module.exports = {
    executeCommand: function(client, target, context, parameters) {
        var callback = function(res) {
            client.say(target, res);
        }
        fileInterface.readFromFile('schedule.txt', callback);
    }
}