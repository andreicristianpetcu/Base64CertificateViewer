function getCertificate (source) {
  // var CertPEM = source.replace(/(-----(BEGIN|END) CERTIFICATE-----|\n)/g, '');
  const caStore = forge.pki.createCaStore();
  caStore.addCertificate(source);
  const myCertificate = caStore.listAllCertificates()[0];
  console.log(JSON.stringify(myCertificate.subject.attributes[0].value, null, 2));
  const certData = {
    commonName: myCertificate.subject.attributes[1].value,
    organization: myCertificate.subject.attributes[0].value
  };
  console.log(certData);
  return certData;
}

chrome.contextMenus.create({
  id: 'view-certificate',
  title: 'Print certificate contents',
  contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == 'view-certificate') {
    console.log(getCertificate(info.selectionText))
  }
});