
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

function getHumanReadableDate(utcDateAsString) {
  const date = new Date(utcDateAsString);
  return date.getUTCDate() + " " + months[date.getUTCMonth()] + " " + date.getUTCFullYear();
}

function cleanupCertificate(rawCertificate) {
  rawCertificate = rawCertificate.replace(/(-----(BEGIN|END) CERTIFICATE-----|\n)/g, '');
  rawCertificate = '-----BEGIN CERTIFICATE-----\n' + rawCertificate + '\n-----END CERTIFICATE-----';
  return rawCertificate;
}

function getFullFormatedDate(dateAsString){
  return getHumanReadableDate(getUtcDate(dateAsString)) + " [" + getUtcDate(dateAsString) + "]";
}

function getCertificate(source) {
  const base64Cert = cleanupCertificate(source);

  const caStore = forge.pki.createCaStore([base64Cert]);

  const myCertificate = caStore.listAllCertificates()[0];

  const subjectCommonName = getAttributeValueByName(myCertificate.subject.attributes, 'commonName');
  const subjectOrganization = getAttributeValueByName(myCertificate.subject.attributes, 'organizationName');
  const issuerCommonName = getAttributeValueByName(myCertificate.issuer.attributes, 'commonName');
  const issuerOrganization = getAttributeValueByName(myCertificate.issuer.attributes, 'organizationName');
  const issuer = issuerCommonName + ', ' + issuerOrganization;
  const validFrom = getFullFormatedDate(myCertificate.validity.notBefore);
  const validTo = getFullFormatedDate(myCertificate.validity.notAfter);

  const certData = {
    commonName: subjectCommonName,
    organization: subjectOrganization,
    serialNumber: myCertificate.serialNumber,
    issuer: issuer,
    validFrom: validFrom,
    validTo: validTo,
    toString: function(){
      return `Common name: ${subjectCommonName}
Organization: ${subjectOrganization}
Issuer: ${issuer}
Serial Number: ${myCertificate.serialNumber}
Valid From: ${validFrom}
Valid To: ${validTo}`;
    }
  };

  return certData;
}

chrome.contextMenus.create({
  id: 'view-certificate',
  title: 'Print certificate contents',
  contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId === 'view-certificate') {
    const certificateData = getCertificate(info.selectionText);

    var showCertInfo = 'alert(\`' + certificateData.toString() + '\`);';

    chrome.tabs.executeScript({
      code: showCertInfo
    });

  }
});
