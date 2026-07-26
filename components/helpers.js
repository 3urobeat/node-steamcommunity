const SteamID = require('steamid');
const xml2js  = require('xml2js');

const EResult = require('../resources/EResult.js');

exports.isSteamID = function(input) {
	var keys = Object.keys(input);
	if (keys.length != 4) {
		return false;
	}

	// Make sure it has the keys we expect
	keys = keys.filter(function(item) {
		return ['universe', 'type', 'instance', 'accountid'].indexOf(item) != -1;
	});

	return keys.length == 4;
};

exports.decodeSteamTime = function(time) {
	var date = new Date();

	if (time.includes("@")) {
		var parts = time.split('@');
		if (!parts[0].includes(",")) {
			// no year, assume current year
			parts[0] += ", " + date.getFullYear();
		}

		date = new Date(parts.join('@').replace(/(am|pm)/, ' $1') + " UTC");  // add a space so JS can decode it
	} else {
		// Relative date
		var amount = time.replace(/(\d) (minutes|hour|hours) ago/, "$1");

		if(time.includes("minutes")) {
			date.setMinutes(date.getMinutes() - amount);
		} else if(time.match(/hour|hours/)) {
			date.setHours(date.getHours() - amount);
		}
	}

	return date;
};

/**
 * Get an Error object for a particular EResult
 * @param {int} eresult
 * @returns {null|Error}
 */
exports.eresultError = function(eresult) {
	if (eresult == EResult.OK) {
		// no error
		return null;
	}

	var err = new Error(EResult[eresult] || ("Error " + eresult));
	err.eresult = eresult;
	return err;
};

exports.decodeJwt = function(jwt) {
	let parts = jwt.split('.');
	if (parts.length != 3) {
		throw new Error('Invalid JWT');
	}

	let standardBase64 = parts[1].replace(/-/g, '+')
		.replace(/_/g, '/');

	return JSON.parse(Buffer.from(standardBase64, 'base64').toString('utf8'));
};

/**
 * Converts `input` into a SteamID object, if it's a parseable string.
 * @param {SteamID|string} input
 * @return {SteamID}
 */
exports.steamID = function(input) {
	if (exports.isSteamID(input)) {
		return input;
	}

	if (typeof input != 'string') {
		throw new Error(`Input SteamID value "${input}" is not a string`);
	}

	// This will throw if the input is not a well-formed SteamID
	return new SteamID(input);
};
