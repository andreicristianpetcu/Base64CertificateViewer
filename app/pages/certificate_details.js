function appendItemToList(itemText, list) {
  if (itemText) {
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(itemText));
    list.appendChild(entry);
  }
}

function populateCertificate(certificateData) {
  content = document.querySelector('#certificateDetails ul');
  content.innerHTML = '';

  appendItemToList('Common name: ' + certificateData.commonName, content);
  appendItemToList('Organization: ' + certificateData.organization, content);
  appendItemToList('Issuer: ' + certificateData.issuer, content);
  appendItemToList('Serial Number: ' + certificateData.serialNumber, content);
  appendItemToList('Valid From: ' + certificateData.validFrom, content);
  appendItemToList('Valid To: ' + certificateData.validTo, content);
  appendItemToList('SHA1: ' + certificateData.sha1fingerprint, content);
  appendItemToList('SHA256: ' + certificateData.sha256fingerprint, content);
}

function init() {
  return new Promise(function (resolve, reject) {
    chrome.runtime.sendMessage({
      type: "REQUEST_CERTIFICATE"
    }, function (response) {
      populateCertificate(response);
      resolve(response);
    });
  });
}

if (typeof global !== "undefined") {
  global.init = init;
} else {
  init();
}
