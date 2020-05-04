module.exports = {
    executeCommand: function(client, target, context, parameters, commandConfig) {
        try {
            if (commandConfig.isEnabled(parameters[0]) && commandConfig.isAllow_Disable(parameters[0])) {
                commandConfig.setEnabled(parameters[0], false);
                commandConfig.saveAsync();
            } else if (!commandConfig.isAllow_Disable(parameters[0])) {
                console.log(`* ` + context['display-name'] + ` tried to disable ` + parameters[0] + `, but disabling is not allowed!`);
            } else {
                console.log(`* ` + context['display-name'] + ` tried to disable ` + parameters[0] + `, but it was already disabled!`);
            }
        }
        catch {
            console.log(`* Something went wrong with !disable!`);
        }
    }
}