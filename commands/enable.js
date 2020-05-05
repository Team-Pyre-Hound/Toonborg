module.exports = {
    executeCommand: function(client, target, context, parameters, commandConfig) {
        try {
            if (commandConfig.isEnabled(parameters[0])) {
                console.log(`* ` + context['display-name'] + ` tried to enable ` + parameters[0] + `, but it was already enabled!`);
            } else {
                if (commandConfig.containsCommand(parameters[0])) {
                    commandConfig.setEnabled(parameters[0], true);
                    commandConfig.saveAsync();
                } else {
                    console.log(`* ` + context['display-name'] + ` tried to enable a nonexistent command!`);
                }
            }
        }
        catch(err) {
            console.log(`* Something went wrong with !enable!`);
        }
    }
}