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
  const caStore = forge.pki.createCaStore([source]);

  const myCertificate = caStore.listAllCertificates()[0];

  const subjectCommonName = getAttributeValueByName(myCertificate.subject.attributes, 'commonName');
  const subjectOrganization = getAttributeValueByName(myCertificate.subject.attributes, 'organizationName');
  const issuerCommonName = getAttributeValueByName(myCertificate.issuer.attributes, 'commonName');
  const issuerOrganization = getAttributeValueByName(myCertificate.issuer.attributes, 'organizationName');

  const certData = {
    commonName: subjectCommonName,
    organization: subjectOrganization,
    serialNumber: myCertificate.serialNumber,
    issuer: issuerCommonName + ', ' + issuerOrganization
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