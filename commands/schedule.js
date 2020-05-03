const path = require('path');
var FileInterface = require(path.join(process.cwd(), 'fileInterface.js'));
const fileInterface = new FileInterface();


module.exports = {
    executeCommand: function(client, target, context, parameters, commandConfig) {
        var failCallback = function(err) {
            console.log(`* Critical error with !schedule, disabling command.`);
            console.log(`  * ` + err);
            commandConfig.setEnabled("!schedule", false);
            commandConfig.saveAsync();
        }
        
        var callback = function(res) {
            client.say(target, res);
        }
        
        fileInterface.readFromFile('schedule.txt', callback, failCallback);
    }
}