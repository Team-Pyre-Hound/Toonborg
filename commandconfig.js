var CommandConfig = function(nconfConfig) {
	this._nconfConfig = nconfConfig;
	this._cooldownDict = {};
};

CommandConfig.prototype.getAllCommandNames = function () {
    return Object.keys(this._nconfConfig.get());
}

CommandConfig.prototype.getAliases = function(commandName) {
    return this._nconfConfig.get(commandName + ":command_aliases");
}

CommandConfig.prototype.getWhitelist = function(commandName) {
    return this._nconfConfig.get(commandName + ":whitelist");
}

CommandConfig.prototype.getHelperText = function(commandName) {
    return this._nconfConfig.get(commandName + ":helper_text");
}

CommandConfig.prototype.getParameters = function(commandName) {
    return this._nconfConfig.get(commandName + ":parameters");
}

CommandConfig.prototype.getCooldown = function(commandName) {
    return this._nconfConfig.get(commandName + ":cooldown");
}

CommandConfig.prototype.isEnabled = function(commandName) {
    return this._nconfConfig.get(commandName + ":enabled");
}

CommandConfig.prototype.setEnabled = function(commandName, isEnabled) {
    return this._nconfConfig.set(commandName + ":enabled", isEnabled);
}

CommandConfig.prototype.getData = function(commandName) {
	return this._nconfConfig.get(commandName + ":data");
}

CommandConfig.prototype.isAllow_Disable = function(commandName) {
    return this._nconfConfig.get(commandName + ":allow_disable");
}

CommandConfig.prototype.addCooldownEntryNow = function(commandName, user) {
	if(typeof(this._cooldownDict[commandName]) === 'undefined') {
		this._cooldownDict[commandName] = {};
	}

	this._cooldownDict[commandName][user] = Date.now();
}

CommandConfig.prototype.isUserInCooldownNow = function(commandName, user) {
	if(typeof(this._cooldownDict[commandName]) === 'undefined') {
		return false;
	}

	if(typeof(this._cooldownDict[commandName][user]) === 'undefined') {
		return false;
	}

	var timeNow = Date.now();
	return timeNow - (this.getCooldown(commandName) * 1000) < this._cooldownDict[commandName][user];
}

CommandConfig.prototype.saveAsync = function() {
    return (new Promise(function(resolve, reject) {
		this._nconfConfig.save(function(err) {
			if(err) {
				console.error(err.message);
				reject(err);
			}

			console.debug("Config saved successfully.");
			resolve("Config saved succesfully");
		})
	}));
}

CommandConfig.prototype.load = function() {
	this._nconfConfig.load();
	console.debug("Loaded Configuration File");
	console.debug(this._nconfConfig);
}

module.exports = CommandConfig;