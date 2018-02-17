// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

'use strict';

function getCertificate(source) {
  var CertPEM = source.replace(/(-----(BEGIN|END) CERTIFICATE-----|\n)/g, '');
  const caStore = forge.pki.createCaStore();
  caStore.addCertificate(source);
  console.log(JSON.stringify(caStore.listAllCertificates()[0].subject.attributes[1].value, null, 2));
  return {
    commonName: caStore.listAllCertificates()[0].subject.attributes[1].value
  };
}

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.contextMenus.create({
  id: 'view-certificate',
  title: 'Print certificate contents',
  contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == 'view-certificate') {
    console.log(getCertificate(info.selectionText));
  }
});