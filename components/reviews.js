const SteamID = require('steamid');

const SteamCommunity = require('../index.js');
const Helpers = require('../components/helpers.js');


/**
 * Posts a comment to a review
 * @param {string | SteamID} userID - SteamID object or steamID64 of the review author
 * @param {string} appID - AppID of the associated game
 * @param {String} message - Content of the comment to post
 * @param {function} [callback] - Takes only an Error object/null as the first argument
 * @return Promise<void> Resolves on success, rejects on failure
 */
SteamCommunity.prototype.postReviewComment = function(userID, appID, message, callback) {
	if (typeof userID == 'string') {
		userID = new SteamID(userID);
	}

	this.httpRequestPost({
		"uri": `https://steamcommunity.com/comment/Recommendation/post/${userID.getSteamID64()}/${appID}/`,
		"form": {
			"comment": message,
			"count": 10,
			"sessionid": this.getSessionID(),
			"json": 1
		},
		"json": true
	}, function(err, response, body) {
		if (!callback) {
			return;
		}

		if (err) {
			callback(err);
			return;
		}

		if (body.success) {
			callback(null);
		} else {
			callback(new Error(body.error));
		}

		callback(null);
	}, "steamcommunity");
};

/**
 * Deletes a comment from a review
 * @param {string | SteamID} userID - SteamID object or steamID64 of the review author
 * @param {string} appID - AppID of the associated game
 * @param {String} message - Content of the comment to post
 * @param {function} [callback] - Takes only an Error object/null as the first argument
 * @return Promise<void> Resolves on success, rejects on failure
 */
SteamCommunity.prototype.deleteReviewComment = function(userID, appID, cid, callback) {
	if (typeof userID == 'string') {
		userID = new SteamID(userID);
	}

	this.httpRequestPost({
		"uri": `https://steamcommunity.com/comment/Recommendation/delete/${userID.getSteamID64()}/${appID}/`,
		"form": {
			"gidcomment": cid,
			"count": 10,
			"sessionid": this.getSessionID(),
			"json": 1
		},
		"json": true
	}, function(err, response, body) {
		if (!callback) {
			return;
		}

		if (err) {
			callback(err);
			return;
		}

		if (body.success && body.success != SteamCommunity.EResult.OK) {
			callback(Helpers.eresultError(body.success));
			return;
		}

		callback(null);
	}, "steamcommunity");
};

/**
 * Subscribes to a review's comment section
 * @param {string | SteamID} userID - SteamID object or steamID64 of the review author
 * @param {string} appID - AppID of the associated game
 * @param {function} [callback] - Takes only an Error object/null as the first argument
 * @return Promise<void> Resolves on success, rejects on failure
 */
SteamCommunity.prototype.subscribeReviewComments = function(userID, appID, callback) {
	if (typeof userID == 'string') {
		userID = new SteamID(userID);
	}

	this.httpRequestPost({
		"uri": `https://steamcommunity.com/comment/Recommendation/subscribe/${userID.getSteamID64()}/${appID}/`,
		"form": {
			"count": 10,
			"sessionid": this.getSessionID(),
			"json": 1
		},
		"json": true
	}, function(err, response, body) {
		if (!callback) {
			return;
		}

		if (err) {
			callback(err);
			return;
		}

		callback(null);
	}, "steamcommunity");
};

/**
 * Unsubscribes from a review's comment section
 * @param {string | SteamID} userID - SteamID object or steamID64 of the review author
 * @param {string} appID - AppID of the associated game
 * @param {function} [callback] - Takes only an Error object/null as the first argument
 * @return Promise<void> Resolves on success, rejects on failure
 */
SteamCommunity.prototype.unsubscribeReviewComments = function(userID, appID, callback) {
	if (typeof userID == 'string') {
		userID = new SteamID(userID);
	}

	this.httpRequestPost({
		"uri": `https://steamcommunity.com/comment/Recommendation/unsubscribe/${userID.getSteamID64()}/${appID}/`,
		"form": {
			"count": 10,
			"sessionid": this.getSessionID(),
			"json": 1
		},
		"json": true
	}, function(err, response, body) {
		if (!callback) {
			return;
		}

		if (err) {
			callback(err);
			return;
		}

		callback(null);
	}, "steamcommunity");
};

/**
 * Votes on a review as helpful
 * @param {string} rid - ID of the review. You can obtain it through `getSteamReview()`
 * @param {function} [callback] - Takes only an Error object/null as the first argument
 * @return Promise<void> Resolves on success, rejects on failure
 */
SteamCommunity.prototype.voteReviewHelpful = function(rid, callback) {
	this.httpRequestPost({
		"uri": `https://steamcommunity.com/userreviews/rate/${rid}`,
		"form": {
			"rateup": 'true',
			"sessionid": this.getSessionID(),
			"json": 1
		},
		"json": true
	}, function(err, response, body) {
		if (!callback) {
			return;
		}

		if (err) {
			callback(err);
			return;
		}

		if (body.success && body.success != SteamCommunity.EResult.OK) {
			callback(Helpers.eresultError(body.success));
			return;
		}

		callback(null);
	}, "steamcommunity");
};

/**
 * Votes on a review as unhelpful
 * @param {string} rid - ID of the review. You can obtain it through `getSteamReview()`
 * @param {function} [callback] - Takes only an Error object/null as the first argument
 * @return Promise<void> Resolves on success, rejects on failure
 */
SteamCommunity.prototype.voteReviewUnhelpful = function(rid, callback) {
	this.httpRequestPost({
		"uri": `https://steamcommunity.com/userreviews/rate/${rid}`,
		"form": {
			"rateup": 'false',
			"sessionid": this.getSessionID(),
			"json": 1
		},
		"json": true
	}, function(err, response, body) {
		if (!callback) {
			return;
		}

		if (err) {
			callback(err);
			return;
		}

		if (body.success && body.success != SteamCommunity.EResult.OK) {
			callback(Helpers.eresultError(body.success));
			return;
		}

		callback(null);
	}, "steamcommunity");
};

/**
 * Votes on a review as funny
 * @param {string} rid - ID of the review. You can obtain it through `getSteamReview()`
 * @param {function} [callback] - Takes only an Error object/null as the first argument
 * @return Promise<void> Resolves on success, rejects on failure
 */
SteamCommunity.prototype.voteReviewFunny = function(rid, callback) {
	this.httpRequestPost({
		"uri": `https://steamcommunity.com/userreviews/votetag/${rid}`,
		"form": {
			"tagid": '1',
			"rateup": 'true',
			"sessionid": this.getSessionID(),
			"json": 1
		},
		"json": true
	}, function(err, response, body) {
		if (!callback) {
			return;
		}

		if (err) {
			callback(err);
			return;
		}

		if (body.success && body.success != SteamCommunity.EResult.OK) {
			callback(Helpers.eresultError(body.success));
			return;
		}

		callback(null);
	}, "steamcommunity");
};

/**
 * Removes funny vote from a review
 * @param {string} rid - ID of the review. You can obtain it through `getSteamReview()`
 * @param {function} [callback] - Takes only an Error object/null as the first argument
 * @return Promise<void> Resolves on success, rejects on failure
 */
SteamCommunity.prototype.voteReviewRemoveFunny = function(rid, callback) {
	this.httpRequestPost({
		"uri": `https://steamcommunity.com/userreviews/votetag/${rid}`,
		"form": {
			"tagid": '1',
			"rateup": 'false',
			"sessionid": this.getSessionID(),
			"json": 1
		},
		"json": true
	}, function(err, response, body) {
		if (!callback) {
			return;
		}

		if (err) {
			callback(err);
			return;
		}

		if (body.success && body.success != SteamCommunity.EResult.OK) {
			callback(Helpers.eresultError(body.success));
			return;
		}

		callback(null);
	}, "steamcommunity");
};
