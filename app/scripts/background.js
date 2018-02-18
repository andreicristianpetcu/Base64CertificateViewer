function getAttributeValueByName(allAttributes, attributeName) {
  var foundValue;
  allAttributes.forEach(attribute => {
    if (attribute.name === attributeName) {
      foundValue = attribute.value;
    }
  });
  return foundValue;
}

function getUtcDate(date) {
  return JSON.stringify(date).split('"')[1];
}

function cleanupCertificate(rawCertificate) {
  rawCertificate = rawCertificate.replace(/(-----(BEGIN|END) CERTIFICATE-----|\n)/g, '');
  rawCertificate = '-----BEGIN CERTIFICATE-----\n' + rawCertificate + '\n-----END CERTIFICATE-----';
  return rawCertificate;
}

function getCertificate(source) {
  console.log("parsing certificate\n" + source);
  const base64Cert = cleanupCertificate(source);
  console.log('cleaned certificate\n' + base64Cert);

  const caStore = forge.pki.createCaStore([base64Cert]);

  const myCertificate = caStore.listAllCertificates()[0];
  // console.log(JSON.stringify(myCertificate.validity, null, 2));

  const subjectCommonName = getAttributeValueByName(myCertificate.subject.attributes, 'commonName');
  const subjectOrganization = getAttributeValueByName(myCertificate.subject.attributes, 'organizationName');
  const issuerCommonName = getAttributeValueByName(myCertificate.issuer.attributes, 'commonName');
  const issuerOrganization = getAttributeValueByName(myCertificate.issuer.attributes, 'organizationName');

  const certData = {
    commonName: subjectCommonName,
    organization: subjectOrganization,
    serialNumber: myCertificate.serialNumber,
    issuer: issuerCommonName + ', ' + issuerOrganization,
    validFrom: getUtcDate(myCertificate.validity.notBefore),
    validTo: getUtcDate(myCertificate.validity.notAfter)
  };

  return certData;
}

chrome.contextMenus.create({
  id: 'view-certificate',
  title: 'Print certificate contents',
  contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === 'view-certificate') {
    const certificateData = getCertificate(info.selectionText);

    const certificateJsonData = JSON.stringify(certificateData, null, 2);
    console.log(certificateJsonData);

    var makeItGreen = 'alert(\'' + certificateJsonData + '\')';
    chrome.tabs.executeScript({
      code: makeItGreen
    });
  }
});
