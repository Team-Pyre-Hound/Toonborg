const path = require('path');
var FileInterface = require(path.join(process.cwd(), 'fileInterface.js'));
const fileInterface = new FileInterface();



module.exports = {
    executeCommand: function(client, target, context, parameters, commandConfig) {
        console.log(parameters);
        var failCallback = function(err) {
            console.log(`* Critical error with !setschedule, disabling command.`);
            console.log(`  * ` + err);
            commandConfig.setEnabled("!setschedule", false);
            commandConfig.saveAsync();
        }
        fileInterface.writeToFile(('schedule.txt'), parameters[0], failCallback);
    }
}