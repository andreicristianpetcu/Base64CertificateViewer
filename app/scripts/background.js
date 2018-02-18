function getAttributeValueByName(allAttributes, attributeName){
  var foundValue;
  allAttributes.forEach(attribute => {
    if(attribute.name === attributeName){
      foundValue = attribute.value;
    }
  });
  return foundValue;
}

function getCertificate (source) {
  // var CertPEM = source.replace(/(-----(BEGIN|END) CERTIFICATE-----|\n)/g, '');
  const caStore = forge.pki.createCaStore();
  caStore.addCertificate(source);
  const myCertificate = caStore.listAllCertificates()[0];
  const certData = {
    commonName: getAttributeValueByName(myCertificate.subject.attributes, 'commonName'),
    organization: getAttributeValueByName(myCertificate.subject.attributes, 'organizationName'),
    serialNumber: myCertificate.serialNumber,
    issuer: getAttributeValueByName(myCertificate.issuer.attributes, 'commonName') + ', ' + getAttributeValueByName(myCertificate.issuer.attributes, 'organizationName')
  };
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