const chrome = require('sinon-chrome/extensions');
const forge = require('node-forge');

global.chrome = chrome;
global.browser = chrome;
browser = chrome;

global.forge = forge;

browser.runtime.sendMessage = sinon.spy();
browser.runtime.onMessage.addListener = sinon.spy();