const tmi = require('tmi.js');
const Promise = require('promise');
const fs = require('fs');
const path = require('path');
const nconf = require('nconf');
nconf.use('file', {file: './commandconfig.json'})
var CommandConfig = require('./commandconfig.js');


// Maps command names to loaded functions.
var commandDict = {};

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

const commandConfig = new CommandConfig(nconf)
commandConfig.load();
loadCommandScripts("commands");

async function loadCommandScripts(directory) {
	try {
		const files = await fs.promises.readdir(directory);
		for(const file of files) {
			const fileStat = await fs.promises.stat(path.join(directory,file));
			if(fileStat.isFile()) {
				var command = require("./" + path.join(directory,file));
				commandDict["!" + path.basename(file, ".js")] = command.executeCommand;
			} else if (fileStat.isDirectory()) {
				await loadCommandScripts(path.join(directory, file));
			}
		}
	} catch (e) {
		console.error("Error loading command scripts", e)
	}
}


//wait for everything to load
bootstrapTwitch();

function bootstrapTwitch(){
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
	if (!commandConfig.getAllCommandNames().includes(command)) {
		console.log(`* ` + context['display-name'] + ` tried to use an unknown command: ` + command);
		return;
	}
	// Check if the user has permission to use that command
	if (!commandConfig.getWhitelist(command).length == 0 && !intersectLists(commandConfig.getWhitelist(command), context['badges'])) {
		console.log(`* ` + context['display-name'] + ` did not have permission to use ` + command);
		client.say(target, 'Sorry, ' + context['display-name'] + ", you don't have permission to use " + command);
		return;
	}
	// Check if the command is enabled
	if (!commandConfig.isEnabled(command)) {
		console.log(`* ` + context['display-name'] + ` tried to use a disabled command: ` + command);
		client.say(target, 'Sorry, ' + context['display-name'] + ', ' + command + ' is currently disabled!');
		return;
	}
	
	commandDict[command](client, target, context, parameters, commandConfig);
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
		params = message.substring(message.indexOf(" ") + 1, message.length).split(/ (?=(?:(?:[^"]*"){2})*[^"]*$)/);
		for(i = 0; i < params.length; i++) {
			if (params[i].substring(0, 1) == '"') {
				params[i] = params[i].substring(1, params[i].length - 1);
			}
		}

		return {command:message.toLowerCase().substring(0, message.indexOf(" ")), parameters:params};
	}

	return {command:message.toLowerCase(), parameters:params};
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
	console.log('* Connected to ${addr}:${port}');
}

