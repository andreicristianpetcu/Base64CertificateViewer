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

      const detailsListItems = document.querySelectorAll('#certificateDetails ul li');
      expect(detailsListItems[0].textContent).toBe('Common name: DST Root CA X3');
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

      const detailsListItems = document.querySelectorAll('#certificateDetails ul li');
      expect(detailsListItems[1].textContent).toBe('Organization: Digital Signature Trust Co.');
      expect(detailsListItems[2].textContent).toBe('Issuer: DST Root CA X3, Digital Signature Trust Co.');
      expect(detailsListItems[3].textContent).toBe('Serial Number: 44afb080d6a327ba893039862ef8406b');
      expect(detailsListItems[4].textContent).toBe('Valid From: 30 September 2000 [2000-09-30T21:12:19.000Z]');
      expect(detailsListItems[5].textContent).toBe('Valid To: 30 September 2021 [2021-09-30T14:01:15.000Z]');
      expect(detailsListItems[6].textContent).toBe('SHA1: DAC9024F54D8F6DF94935FB1732638CA6AD77C13');
      expect(detailsListItems[7].textContent).toBe('SHA256: 0687260331A72403D909F105E69BCF0D32E1BD2493FFC6D9206D11BCD6770739');
    });

  });
})();
