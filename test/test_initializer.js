const chrome = require('sinon-chrome/extensions');
const forge = require('node-forge');

global.chrome = chrome;
browser = chrome;
global.forge = forge;
global.navigator.clipboard.readText = function () {
  return Promise.resolve('');
};
