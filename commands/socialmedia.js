module.exports = {
    executeCommand: function(client, target, context, parameters, commandConfig) {
        client.say(target, "^^^^^^^George's Socials!^^^^^^^ " + 
            "Instagram: " + commandConfig.getData("!socialmedia")["instagram_link"] + " ....................| " +
            "VSCO: " + commandConfig.getData("!socialmedia")["vsco_link"] + " .........................................| " +
            "Snapchat: " + commandConfig.getData("!socialmedia")["snapchat_username"] + " ...................................................| " +
            "GF Trio Spotify: " + commandConfig.getData("!socialmedia")["spotify_link"] + " ..........| " +
            "Steam Username: " + commandConfig.getData("!socialmedia")["steam_username"] + " ..........| " +
            "Steam Friendcode: " + commandConfig.getData("!socialmedia")["steam_friendcode"] + " .............| " +
            "Battle.net: " + commandConfig.getData("!socialmedia")["battlenet"] + " ...............| " +
            "Riot Games: " + commandConfig.getData("!socialmedia")["riotgames"] + " ...............| ");
    }
}