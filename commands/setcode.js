module.exports = {
    executeCommand: function(client, target, context, parameters, commandConfig) {
        temp = commandConfig.getData('!setcode');
        console.log(temp);
        temp['code'] = parameters[0];
        commandConfig.setData("!jackboxcode", temp);
    } 
}