module.exports = {
    executeCommand: function(client, target, context, parameters, commandConfig) {
        client.say(target, "George's World Discord: " + commandConfig.getData("!discord")["discord_link"]);
    }
}