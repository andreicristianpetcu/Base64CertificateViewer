(function () {
  'use strict'

  describe('opening certificate details page', function () {

    it('should have the correct common name', async function () {
      document.body.innerHTML = window.__html__['app/pages/certificate_details.html'];
      chrome.runtime.sendMessage.callsFake(function (message, callback) {
        if (message.type === 'REQUEST_CERTIFICATE') {
          callback({
            commonName: "DST Root CA X3",
          });
        }
      });

      await init(document);

      const detailsListItems = document.querySelectorAll('#certificateDetails div');
      expect(getKeyAndValue(detailsListItems, 0)).toBe('Common name: DST Root CA X3');
    });

    it('should have the correct fields', async function () {
      document.body.innerHTML = window.__html__['app/pages/certificate_details.html'];
      chrome.runtime.sendMessage.callsFake(function (message, callback) {
        if (message.type === 'REQUEST_CERTIFICATE') {
          callback({
            commonName: "DST Root CA X3",
            organization: "Digital Signature Trust Co.",
            serialNumber: "44afb080d6a327ba893039862ef8406b",
            issuer: "DST Root CA X3, Digital Signature Trust Co.",
            validFrom: "30 September 2000 [2000-09-30T21:12:19.000Z]",
            validTo: "30 September 2021 [2021-09-30T14:01:15.000Z]",
            sha1fingerprint: "DAC9024F54D8F6DF94935FB1732638CA6AD77C13",
            sha256fingerprint: "0687260331A72403D909F105E69BCF0D32E1BD2493FFC6D9206D11BCD6770739",
          });
        }
      });

      await init(document);

      const detailsListItems = document.querySelectorAll('#certificateDetails div');
      expect(getKeyAndValue(detailsListItems, 1)).toBe('Organization: Digital Signature Trust Co.');
      expect(getKeyAndValue(detailsListItems, 2)).toBe('Issuer: DST Root CA X3, Digital Signature Trust Co.');
      expect(getKeyAndValue(detailsListItems, 3)).toBe('Serial Number: 44afb080d6a327ba893039862ef8406b');
      expect(getKeyAndValue(detailsListItems, 4)).toBe('Valid From: 30 September 2000 [2000-09-30T21:12:19.000Z]');
      expect(getKeyAndValue(detailsListItems, 5)).toBe('Valid To: 30 September 2021 [2021-09-30T14:01:15.000Z]');
      expect(getKeyAndValue(detailsListItems, 6)).toBe('SHA1: DAC9024F54D8F6DF94935FB1732638CA6AD77C13');
      expect(getKeyAndValue(detailsListItems, 7)).toBe('SHA256: 0687260331A72403D909F105E69BCF0D32E1BD2493FFC6D9206D11BCD6770739');
    });

  });

  function getKeyAndValue(nodeList, row) {
    var key = nodeList[row * 2].textContent;
    var value = nodeList[(row * 2) + 1].textContent;
    return key + ' ' + value;
  }
})();
