const tmi = require('tmi.js');
const Promise = require('promise');
const fs = require('fs');

var commandDict = {};
commandDict['!bonk'] = bonkCommand;
commandDict['!schedule'] = scheduleCommand;

var asyncReadFile = Promise.denodeify(require('fs').readFile);
var asyncWriteFile = Promise.denodeify(require('fs').writeFile);
var bonks;

// Define configuration options
const opts = {
	identity: {
		username: 'toonborg',
		password: 'oauth:uc64jykjuj3u0uzx0hbp30qag0j3tt'
	},
	channels: [
		'Toony204'
	]
};

// Create a client with our options
const client = new tmi.client(opts);

const loadConfigsPromise = asyncReadFile('schedule.json', 'utf8')
							.then(enableConfig)
							.catch(function(error) {
								console.error(error);
							});
							
const loadBonkPromise = asyncReadFile('bonks.txt', 'utf8')
							.then(enableBonk)
							.catch(function(error) {
								console.error(error);
							});
						
var commandConfig;
function enableConfig(res) {
	commandConfig = JSON.parse(res);
}


function enableBonk(res) {
	bonks = parseInt(res);
	// Enable Bonk Command Here!
}


//wait for everything to load
Promise.all([loadBonkPromise]).then(bootstrapTwitch);

function bootstrapTwitch(results){
	//Register our event handlers (defined below)
	client.on('message', onMessageHandler);
	client.on('connected', onConnectedHandler);
	// Connect to Twitch:
	client.connect();
}

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
	if (self) {return; } // Ignore messages from the bot
	
	// Remove whitespace from chat message
	target = 'toony204';
	const commandName = messageScrub(msg.trim());
	commandHandler(commandName.command, target, context, commandName.parameters);
}


function commandHandler (command, target, context, parameters) {
	// Check if the command exists
	if (!(command in commandDict)) {
		console.log(`* ` + context['display-name'] + ` tried to use an unknown command: ` + command);
		return;
	}
	// Check if the user has permission to use that command
	if (!commandConfig[command]['whitelist'].length == 0 && !intersectLists(commandConfig[command]['whitelist'], context['badges'])) {
		console.log(`* ` + context['display-name'] + ` did not have permission to use ` + command);
		client.say(target, 'Sorry, ' + context['display-name'] + ", you don't have permission to use " + command);
		return;
	}
	// Check if the command is enabled
	if (!commandConfig[command]['enabled']) {
		console.log(`* ` + context['display-name'] + ` tried to use a disabled command: ` + command);
		client.say(target, 'Sorry, ' + context['display-name'] + ', ' + command + ' is currently disabled!');
		return;
	}
	commandDict[command](target, context, parameters);
	console.log(`* ` + context['display-name'] + ` Executed ${command}`);
}

// returns true if there is at least one match between two lists
function intersectLists (whitelist, badges) {
	for (i = 0; i < whitelist.length; i++) {
		if(Object.keys(badges).includes(whitelist[i])) {
			return true;
		}
	}
	return false;
}

// trims and lower cases all messages. Returns null if it doesn't start with !
function messageScrub(message) {
	if (message.substring(0, 1) != '!') {
		return;
	}
	var params;
	// if there is more text after the command
	if (message.indexOf(" ") != -1) {
		params = message.substring(message.indexOf(" "), message.length).split(/ (?=(?:(?:[^"]*"){2})*[^"]*$)/);
		for(i = 0; i < params.length; i++) {
			if (params[i].substring(0, 1) == '"') {
				params[i] = params[i].substring(1, params[i].length - 1);
			}
		}
	}
	return {command:message.toLowerCase().substring(0, message.indexOf(" ")), parameters:params};
}

// Bonks
function bonkCommand(target, context, msg) {
	bonks++;
	asyncWriteFile('bonks.txt', bonks).catch(function(error){console.error(error);}).done();
	client.say(target, String(context['display-name']) + ' Bonked! Chat has Bonked ' + String(bonks) + ' times!');
}

// Says schedule in chat
function scheduleCommand(target, context, msg) {
	client.say(target, "I smell liek beef");
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
	console.log('* Connected to ${addr}:${port}');
}