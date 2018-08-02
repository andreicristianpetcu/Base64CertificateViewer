const chrome = require('sinon-chrome/extensions');
const forge = require('node-forge');

global.chrome = chrome;
global.browser = chrome;
window.chrome = chrome;
window.browser = chrome;

global.forge = forge;