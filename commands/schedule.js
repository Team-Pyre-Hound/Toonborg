var binko = 0;


module.exports = {
    executeCommand: function(client, target, context, parameters) {
        binko ++;
        client.say(target, "I smell liek beef" + binko);
    }
}