(function() {
  'use strict'

  describe('Tests certificate parser', function () {

    describe('with correct certificate fields from PEM file', function () {

      it('should have commonName', function () {
        expect(getCertificate(getLetsEncryptCertificate()).commonName).toBe('DST Root CA X3');
      });

      it('should have organization', function () {
        expect(getCertificate(getLetsEncryptCertificate()).organization).toBe('Digital Signature Trust Co.');
      });

      it('should have issuer', function () {
        expect(getCertificate(getLetsEncryptCertificate()).issuer).toBe('DST Root CA X3, Digital Signature Trust Co.');
      });

      it('should have serial number', function () {
        expect(getCertificate(getLetsEncryptCertificate()).serialNumber).toBe('44afb080d6a327ba893039862ef8406b');
      });

      it('should have valid from', function () {
        expect(getCertificate(getLetsEncryptCertificate()).validFrom).toBe('2000-09-30T21:12:19.000Z');
      });

      it('should have valid to', function () {
        expect(getCertificate(getLetsEncryptCertificate()).validTo).toBe('2021-09-30T14:01:15.000Z');
      });

      it('should have nice string representation', function () {
        expect(getCertificate(getLetsEncryptCertificate()).toString()).toBe(
`Common name: DST Root CA X3
Organization: Digital Signature Trust Co.
Issuer: DST Root CA X3, Digital Signature Trust Co.
Serial Number: 44afb080d6a327ba893039862ef8406b
Valid From: 2000-09-30T21:12:19.000Z
Valid To: 2021-09-30T14:01:15.000Z`);
      });


    });

    describe('with incorrect certificate', function () {

      it('should parse oneline certificate', function () {
        expect(getCertificate(getOnelineCertificate()).commonName).toBe('mozilla.org');
      });

    });

  });
})();

function getLetsEncryptCertificate() {
  return `-----BEGIN CERTIFICATE-----
MIIDSjCCAjKgAwIBAgIQRK+wgNajJ7qJMDmGLvhAazANBgkqhkiG9w0BAQUFADA/
MSQwIgYDVQQKExtEaWdpdGFsIFNpZ25hdHVyZSBUcnVzdCBDby4xFzAVBgNVBAMT
DkRTVCBSb290IENBIFgzMB4XDTAwMDkzMDIxMTIxOVoXDTIxMDkzMDE0MDExNVow
PzEkMCIGA1UEChMbRGlnaXRhbCBTaWduYXR1cmUgVHJ1c3QgQ28uMRcwFQYDVQQD
Ew5EU1QgUm9vdCBDQSBYMzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB
AN+v6ZdQCINXtMxiZfaQguzH0yxrMMpb7NnDfcdAwRgUi+DoM3ZJKuM/IUmTrE4O
rz5Iy2Xu/NMhD2XSKtkyj4zl93ewEnu1lcCJo6m67XMuegwGMoOifooUMM0RoOEq
OLl5CjH9UL2AZd+3UWODyOKIYepLYYHsUmu5ouJLGiifSKOeDNoJjj4XLh7dIN9b
xiqKqy69cK3FCxolkHRyxXtqqzTWMIn/5WgTe1QLyNau7Fqckh49ZLOMxt+/yUFw
7BZy1SbsOFU5Q9D8/RhcQPGX69Wam40dutolucbY38EVAjqr2m7xPi71XAicPNaD
aeQQmxkqtilX4+U9m5/wAl0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNV
HQ8BAf8EBAMCAQYwHQYDVR0OBBYEFMSnsaR7LHH62+FLkHX/xBVghYkQMA0GCSqG
SIb3DQEBBQUAA4IBAQCjGiybFwBcqR7uKGY3Or+Dxz9LwwmglSBd49lZRNI+DT69
ikugdB/OEIKcdBodfpga3csTS7MgROSR6cz8faXbauX+5v3gTt23ADq1cEmv8uXr
AvHRAosZy5Q6XkjEGB5YGV8eAlrwDPGxrancWYaLbumR9YbK+rlmM6pZW87ipxZz
R8srzJmwN0jP41ZL9c8PDHIyh8bwRLtTcm1D9SZImlJnt1ir/md2cXjbDaJWFBM5
JDGFoqgCWjBH4d1QB7wCCZAA62RjYJsWvIjJEubSfZGL+T0yjWW06XyxV3bqxbYo
Ob8VZRzI9neWagqNdwvYkQsEjgfbKbYK7p2CNTUQ
-----END CERTIFICATE-----`;
}

function getOnelineCertificate(){
  return `MIIH+TCCBuGgAwIBAgIQCLTVuQqUkB24PV+Clbic+TANBgkqhkiG9w0BAQsFADB1MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3d3cuZGlnaWNlcnQuY29tMTQwMgYDVQQDEytEaWdpQ2VydCBTSEEyIEV4dGVuZGVkIFZhbGlkYXRpb24gU2VydmVyIENBMB4XDTE2MTEwOTAwMDAwMFoXDTE4MTExNDEyMDAwMFowggECMR0wGwYDVQQPDBRQcml2YXRlIE9yZ2FuaXphdGlvbjETMBEGCysGAQQBgjc8AgEDEwJVUzEbMBkGCysGAQQBgjc8AgECEwpDYWxpZm9ybmlhMREwDwYDVQQFEwhDMjc1OTIwODEeMBwGA1UECRMVNjUwIENhc3RybyBTdCBTdGUgMzAwMQ4wDAYDVQQREwU5NDA0MTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxHDAaBgNVBAoTE01vemlsbGEgQ29ycG9yYXRpb24xFDASBgNVBAMTC21vemlsbGEub3JnMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAojTWgYqURVDP291yrYhgqecAn++PQjzOesgJkZoPQdd4JuJMxg4Cxbfp00qpjJv9DNWCoQsYGGRNyXL6Xmxy7PVwD5m+2C27ogOa0xSBP5hBr07CaqQ1yAJw0RKwGilLbiiSzJoy21AUyY/uKxKogfMM9nnTfF4TQaYkahyeOCjhoIXW2/nhoRvmzQkKtCc3kdKE64j8PgmeImu3nV4uw6XNj48umyuhHG+6G5Svt7d/DhSoTNKoiyigf4lLZuVCY3fwLVQh2Rx1Xz+cMpXLU6OIqdnZbDa9hlEFgN2C6MoSmcfo6BX8Ruvyzqc2f+FNDGwjCGiAlxes3ZhcSwFjsQIDAQABo4ID9DCCA/AwHwYDVR0jBBgwFoAUPdNQpdagre7zSmAKZdMh1Pj41g8wHQYDVR0OBBYEFCqAuKQ3S0o1NBRkMZ7we/y2w6CTMCcGA1UdEQQgMB6CC21vemlsbGEub3Jngg93d3cubW96aWxsYS5vcmcwDgYDVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjB1BgNVHR8EbjBsMDSgMqAwhi5odHRwOi8vY3JsMy5kaWdpY2VydC5jb20vc2hhMi1ldi1zZXJ2ZXItZzEuY3JsMDSgMqAwhi5odHRwOi8vY3JsNC5kaWdpY2VydC5jb20vc2hhMi1ldi1zZXJ2ZXItZzEuY3JsMEsGA1UdIAREMEIwNwYJYIZIAYb9bAIBMCowKAYIKwYBBQUHAgEWHGh0dHBzOi8vd3d3LmRpZ2ljZXJ0LmNvbS9DUFMwBwYFZ4EMAQEwgYgGCCsGAQUFBwEBBHwwejAkBggrBgEFBQcwAYYYaHR0cDovL29jc3Au ZGlnaWNlcnQuY29tMFIGCCsGAQUFBzAChkZodHRwOi8vY2FjZXJ0cy5kaWdpY2Vy dC5jb20vRGlnaUNlcnRTSEEyRXh0ZW5kZWRWYWxpZGF0aW9uU2VydmVyQ0EuY3J0 MAwGA1UdEwEB/wQCMAAwggH3BgorBgEEAdZ5AgQCBIIB5wSCAeMB4QB1AKS5CZC0 GFgUh7sTosxncAo8NZgE+RvfuON3zQ7IDdwQAAABWEtou44AAAQDAEYwRAIgadQv Taz8vG28WPPQyoD32Nfvekz/WfdMdTjc88YcYC4CIBncp5Yqet7J3JSiNWJnbaeW tBvTjoO6vudBurSFaqWmAHYAaPaY+B9kgr46jO65KB1M/HFRXWeT1ETRCmesu09P +8QAAAFYS2i7XQAABAMARzBFAiEAxbQYHhg6zA3Q7Y1hdXNVtd2yaOg1g4iIV38V eG2WBoMCIAT2azrUy9ndA3hZPPk2hV8YTEItIocJB81F/J4wf2NMAHcAVhQGmi/X wuzT9eG9RLI+x0Z2ubyZEVzA75SYVdaJ0N0AAAFYS2i7+gAABAMASDBGAiEA4/5v iFhhenp07noR8YSkvuiHF+D+6fmDhqcH2shxiboCIQCyPAVUuxnyrWK3PPDbqGx4YPi5i5DIQUbyT/UiqaOVtwB3AO5Lvbd1zmC64UJpH6vhnmajD35fsHLYgwDEe4l6qP3LAAABWEtovaIAAAQDAEgwRgIhAJ1S5/U2TqjMRHM8WLpZ+SRroBRoFXqLLj0kEffVe9MtAiEAgxkb74Z6pNVKx898PkNtxICcVRDah4loTSFsftgMAjYwDQYJKoZI hvcNAQELBQADggEBAAAxqPv0YMMRvgwOIKr5s6DqE4fUdkntQZn2y8VkLyNPodUP 5s64ZbnNcceubSPwgqbrXAEVdn2YLyFde1j/npTRfvQH4nPjN8zmIdZFQ/7FYp9bTUFQbouea6gf8/pVUgIFa0945hikojNzIXATFynDFFarpx+h957jOGlfhkXqFEK0cPrikLhxDrI5LWDv8tcJSW971gDngSY8N3htFgvDkCMVhBuQM02UTW++WuCe5rzWk8vQ3NfJoqy3Vm3YhRpOTF3UFbTXCpmzAb1hgt+iz4k1soCJo9YwOewwd5aS8Bk2+vjtOafBNN6UdLa4WjRX+JnX5wIANzL9azCzLUc=`; }