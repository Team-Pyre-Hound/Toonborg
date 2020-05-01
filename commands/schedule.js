const path = require('path');
var FileInterface = require(path.join(process.cwd(), 'fileInterface.js'));
const fileInterface = new FileInterface();

var callback = function(res) {
    client.say(target, res);
}

var failCallback = function(err) {
    console.log(`* Critical error with !schedule, disabling command.`);
    console.log(`  * ` + err);
    commandConfig.setEnabled("!schedule", false);
}

module.exports = {
    executeCommand: function(client, target, context, parameters, commandConfig) {
        fileInterface.readFromFile('schedule.txt', callback, failCallback);
    }
}