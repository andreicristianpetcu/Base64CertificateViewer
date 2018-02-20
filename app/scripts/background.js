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

    var showCertInfo = 'alert(\`' + certificateJsonData.split('"').join('') + '\`);';

    console.log(showCertInfo);

    chrome.tabs.executeScript({
      code: showCertInfo
    });


    // browser.sidebarAction.setPanel({panel: 'data:text/html,lots of text...<p><a name%3D"bottom">bottom</a>?arg=val'});

    // browser.sidebarAction.getPanel({}).then(function(panel){
    //   console.log(panel);
    // });

    // browser.runtime.sendMessage({"url": 'value'});

    // function handleResponse(message) {
    //   console.log(`Message from the background script:  ${message.response}`);
    // }
    
    // function handleError(error) {
    //   console.log(`Error: ${error}`);
    // }
    
    // var sending = browser.runtime.sendMessage({
    //   greeting: "Greeting from the content script"
    // });
    // sending.then(handleResponse, handleError);  

    // const myElement = document.getElementById("myElement");
    // myElement.innerHTML = certificateJsonData.split('"').join('');

  }
});
