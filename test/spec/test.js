(function () {
  'use strict';

  describe('Tests certificate parser', function () {
    it('should extract certificate from XML tags', function () {
      expect(getCertificate('MIIFdTCCBF2gAwIBAgIHS0RwztQ2rzANBgkqhkiG9w0BAQUFADCB3DELMAkGA1UE')).toBe('MIIFdTCCBF2gAwIBAgIHS0RwztQ2rzANBgkqhkiG9w0BAQUFADCB3DELMAkGA1UE');
    });
  });
})();
