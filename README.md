# Steam Community for Node.js (3urobeat's Fork)
[![npm version](https://img.shields.io/npm/v/@3urobeat/steamcommunity.svg)](https://npmjs.com/package/@3urobeat/steamcommunity)
[![npm downloads](https://img.shields.io/npm/dm/@3urobeat/steamcommunity.svg)](https://npmjs.com/package/@3urobeat/steamcommunity)
[![license](https://img.shields.io/npm/l/@3urobeat/steamcommunity.svg)](https://github.com/3urobeat/node-steamcommunity/blob/master/LICENSE)
[![DoctorMcKay's paypal](https://img.shields.io/badge/doctormckay's%20paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=N36YVAT42CZ4G&item_name=node%2dsteamcommunity&currency_code=USD)

This module provides an easy interface for the Steam Community website. This module can be used to simply login to
steamcommunity.com for use with other libraries, or to interact with steamcommunity.com.

This fork extends DoctorMcKay's v3 branch with unmerged fixes, features and updates:
- Extend sharedfiles support [DoctorMcKay/node-steamcommunity #344](https://github.com/DoctorMcKay/node-steamcommunity/pull/344)
- Fix resolving vanity for private profiles returning error: [DoctorMcKay/node-steamcommunity #315](https://github.com/DoctorMcKay/node-steamcommunity/pull/315)
- Fix sharedfile data scraping failing as a non-english page was returned by Steam: [DoctorMcKay/node-steamcommunity #316](https://github.com/DoctorMcKay/node-steamcommunity/pull/316)
- Fix scraping sharedfile type failing when incomplete breadcrumb was returned: [DoctorMcKay/node-steamcommunity #316](https://github.com/DoctorMcKay/node-steamcommunity/pull/316)
- Add discussions support: [DoctorMcKay/node-steamcommunity #319](https://github.com/DoctorMcKay/node-steamcommunity/pull/319)
- Add reviews support: [DoctorMcKay/node-steamcommunity #335](https://github.com/DoctorMcKay/node-steamcommunity/pull/335)
- Migrate from deprecated `requests` to `got`. Fixes issues documented here: [3urobeat/steam-comment-service-bot #285](https://github.com/3urobeat/steam-comment-service-bot/issues/285)
- Update dependencies

This fork is *mostly* a drop-in replacement, except for anything listed in the chapter below.

&nbsp;

# Documentation
## Fork
This fork uses `got` instead of the deprecated `requests` library.  
Setting up a SteamCommunity instance using a proxy therefore differs:  
```js
const SteamCommunity = require("@3urobeat/steamcommunity");
const got            = require(require.resolve("got", { paths: [require.resolve("steamcommunity")] })).default; // Use got bundled with steamcommunity

const communityProxyAgent = new HttpsProxyAgent("http://0.0.0.0:1234");
const community           = new SteamCommunity({ got: got.extend({ agent: { https: communityProxyAgent, http: communityProxyAgent }, decompress: true }) });
```

## Base
Documentation of the base repository is available on the [GitHub wiki](https://github.com/DoctorMcKay/node-steamcommunity/wiki).

&nbsp;

# Support
Is your issue related to anything added in this fork?  
**Yes:** Open an issue here, don't bother DoctorMcKay with it.  
**No:** Follow the official support instructions below.

Report bugs on the [issue tracker](https://github.com/DoctorMcKay/node-steamcommunity/issues) or ask questions
on the [dedicated forum](https://dev.doctormckay.com/forum/8-node-steamcommunity/).
