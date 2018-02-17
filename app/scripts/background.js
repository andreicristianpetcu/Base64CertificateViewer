// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

'use strict';

function str2ab(str) {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);

    for(var i = 0, strLen = str.length; i < strLen; i++)
        bufView[i] = str.charCodeAt(i);

    return buf;
};

function getCertificate(source) {
  var CertPEM = source.replace(/(-----(BEGIN|END) CERTIFICATE-----|\n)/g, '');
  var CertBuf = str2ab(CertPEM);
  var asn1 = pkijs.org.pkijs.fromBER(CertBuf);
  var cert_simpl = new pkijs.org.pkijs.simpl.CERT({ schema: asn1.result });
  return {
    commonName: 'fake'
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