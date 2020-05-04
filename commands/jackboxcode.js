module.exports = {
    executeCommand: function(client, target, context, parameters, commandConfig) {
        client.say(target, commandConfig.getData("!jackboxcode")['code']);
    }
}