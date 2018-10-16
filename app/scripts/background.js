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

function getCertificateFomXml(xmlContainingCertificate) {
  var xmlTagRegex = /(<([^>]+)>)/ig;
  xmlContainingCertificate = xmlContainingCertificate.replace(xmlTagRegex, "");
  return xmlContainingCertificate;
}

function cleanupCertificate(rawCertificate) {
  if(rawCertificate.charAt(0) == "\"" && rawCertificate.charAt(rawCertificate.length - 1) == "\""){
    rawCertificate = rawCertificate.substring(1, rawCertificate.length - 1)
  }

  if (rawCertificate.indexOf("</") > -1 && rawCertificate.indexOf(">") > -1) {
    rawCertificate = getCertificateFomXml(rawCertificate);
  }

  if (rawCertificate.indexOf("+    ") > -1 || rawCertificate.indexOf("-    ") > -1) {
    rawCertificate = rawCertificate.replace(/((\+|-)    )/g, '');
  }

  rawCertificate = rawCertificate.replace(/(-----(BEGIN|END) CERTIFICATE-----|\n)/g, '');
  rawCertificate = '-----BEGIN CERTIFICATE-----\n' + rawCertificate + '\n-----END CERTIFICATE-----';
  return rawCertificate;
}

function getFullFormatedDate(dateAsString) {
  return getHumanReadableDate(getUtcDate(dateAsString)) + " [" + getUtcDate(dateAsString) + "]";
}

function getShaFingerprint(myCertificate, hashAlgorithm) {
  var asn1 = forge.pki.certificateToAsn1(myCertificate);
  var der = forge.asn1.toDer(asn1);
  var md = forge.md[hashAlgorithm].create();
  md.update(der.data);
  return md.digest().toHex().toUpperCase();
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
  const sha1fingerprint = getShaFingerprint(myCertificate, 'sha1');
  const sha256fingerprint = getShaFingerprint(myCertificate, 'sha256');

  const certData = {
    commonName: subjectCommonName,
    organization: subjectOrganization,
    serialNumber: myCertificate.serialNumber,
    issuer: issuer,
    validFrom: validFrom,
    validTo: validTo,
    sha1fingerprint: sha1fingerprint,
    sha256fingerprint: sha256fingerprint,
    toString: function () {
      return `Common name: ${subjectCommonName}
Organization: ${subjectOrganization}
Issuer: ${issuer}
Serial Number: ${myCertificate.serialNumber}
Valid From: ${validFrom}
Valid To: ${validTo}
SHA1: ${sha1fingerprint}
SHA256: ${sha256fingerprint}`;
    }
  };

  return certData;
}

chrome.contextMenus.create({
  id: 'view-certificate',
  title: 'Print certificate contents',
  contexts: ['selection']
});

var selectionText;

function handleMessage(request, sender, sendResponse) {
  const certificateData = getCertificate(selectionText);
  sendResponse(certificateData);
}
chrome.runtime.onMessage.addListener(handleMessage);

chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId === 'view-certificate') {
    selectionText = info.selectionText;

    chrome.tabs.create({
      url: `/pages/certificate_details.html`,
    });

  }
});

if (typeof global !== "undefined") {
  global.getCertificate = getCertificate;
}
