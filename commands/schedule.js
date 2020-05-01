const path = require('path');
var FileInterface = require(path.join(process.cwd(), 'fileInterface.js'));
const fileInterface = new FileInterface();

module.exports = {
    executeCommand: function(client, target, context, parameters, commandConfig) {
        
        // Can I move these callbacks outside of the export?
        var callback = function(res) {
            client.say(target, res);
        }

        var failCallback = function(err) {
            console.log(`* Critical error with !schedule, disabling command.`);
            console.log(`  * ` + err);
            commandConfig.setEnabled("!schedule", false);
        }

        fileInterface.readFromFile('schedule.txt', callback, failCallback);
    }
}