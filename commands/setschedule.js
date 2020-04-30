const path = require('path');
var FileInterface = require(path.join(process.cwd(), 'fileInterface.js'));
const fileInterface = new FileInterface();


module.exports = {
    executeCommand: function(client, target, context, parameters) {
        console.log(parameters);
        fileInterface.writeToFile(('schedule.txt'), parameters[0]);
    }
}