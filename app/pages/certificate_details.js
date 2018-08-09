function populateCertificate(certificateData){
    content = document.querySelector('#certificateDetails ul');
    content.innerHTML = '';

    var entry = document.createElement('li');

    entry.appendChild(document.createTextNode('Common name: ' + certificateData.commonName));
    content.appendChild(entry);
}

if (global) {
  global.populateCertificate = populateCertificate;
}
