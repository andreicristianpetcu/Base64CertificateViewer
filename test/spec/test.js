(function () {
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
        expect(getCertificate(getLetsEncryptCertificate()).validFrom).toContain('2000-09-30T21:12:19.000Z');
      });

      it('should have valid to', function () {
        expect(getCertificate(getLetsEncryptCertificate()).validTo).toContain('2021-09-30T14:01:15.000Z');
      });

      it('should have valid from', function () {
        expect(getCertificate(getLetsEncryptCertificate()).validFrom).toBe('30 September 2000 [2000-09-30T21:12:19.000Z]');
      });

      it('should have valid sha1 fingerprint', function () {
        expect(getCertificate(getLetsEncryptCertificate()).sha1fingerprint).toBe('DAC9024F54D8F6DF94935FB1732638CA6AD77C13');
      });

      fit('should have valid sha2 fingerprint', function () {
        expect(getCertificate(getWwwLetsEncryptCertificate()).sha2fingerprint)
            .toBe('845D44D07DDBFFF9DAB181979D9D1B81DDC0477D1CE5A0B8D0E3B15E8AA247BD');
      });

      it('should have nice formated representation', function () {
        const certificateFormatLines = getCertificate(getLetsEncryptCertificate()).toString().split('\n');

        expect(certificateFormatLines[0]).toBe('Common name: DST Root CA X3');
        expect(certificateFormatLines[1]).toBe('Organization: Digital Signature Trust Co.');
        expect(certificateFormatLines[2]).toBe('Issuer: DST Root CA X3, Digital Signature Trust Co.');
        expect(certificateFormatLines[3]).toBe('Serial Number: 44afb080d6a327ba893039862ef8406b');
        expect(certificateFormatLines[4]).toBe('Valid From: 30 September 2000 [2000-09-30T21:12:19.000Z]');
        expect(certificateFormatLines[5]).toBe('Valid To: 30 September 2021 [2021-09-30T14:01:15.000Z]');
      });

    });

    describe('with incorrect certificate', function () {

      it('should parse oneline certificate', function () {
        expect(getCertificate(getOnelineCertificate()).commonName).toBe('mozilla.org');
      });

      it('should parse oneline certificate with XML', function () {
        const certWithXML = "<ds:X509Certificate>" + getOnelineCertificate() + "</ds:X509Certificate>";
        expect(getCertificate(certWithXML).commonName).toBe('mozilla.org');
      });

      it('should parse oneline certificate added in a diff', function () {
        const addedCert = "+      " + getOnelineCertificate();
        expect(getCertificate(addedCert).commonName).toBe('mozilla.org');
      });

      it('should parse oneline certificate removed from a diff', function () {
        const removedCert = "-      " + getOnelineCertificate();
        expect(getCertificate(removedCert).commonName).toBe('mozilla.org');
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

function getOnelineCertificate() {
  return `MIIH+TCCBuGgAwIBAgIQCLTVuQqUkB24PV+Clbic+TANBgkqhkiG9w0BAQsFADB1MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3d3cuZGlnaWNlcnQuY29tMTQwMgYDVQQDEytEaWdpQ2VydCBTSEEyIEV4dGVuZGVkIFZhbGlkYXRpb24gU2VydmVyIENBMB4XDTE2MTEwOTAwMDAwMFoXDTE4MTExNDEyMDAwMFowggECMR0wGwYDVQQPDBRQcml2YXRlIE9yZ2FuaXphdGlvbjETMBEGCysGAQQBgjc8AgEDEwJVUzEbMBkGCysGAQQBgjc8AgECEwpDYWxpZm9ybmlhMREwDwYDVQQFEwhDMjc1OTIwODEeMBwGA1UECRMVNjUwIENhc3RybyBTdCBTdGUgMzAwMQ4wDAYDVQQREwU5NDA0MTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxHDAaBgNVBAoTE01vemlsbGEgQ29ycG9yYXRpb24xFDASBgNVBAMTC21vemlsbGEub3JnMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAojTWgYqURVDP291yrYhgqecAn++PQjzOesgJkZoPQdd4JuJMxg4Cxbfp00qpjJv9DNWCoQsYGGRNyXL6Xmxy7PVwD5m+2C27ogOa0xSBP5hBr07CaqQ1yAJw0RKwGilLbiiSzJoy21AUyY/uKxKogfMM9nnTfF4TQaYkahyeOCjhoIXW2/nhoRvmzQkKtCc3kdKE64j8PgmeImu3nV4uw6XNj48umyuhHG+6G5Svt7d/DhSoTNKoiyigf4lLZuVCY3fwLVQh2Rx1Xz+cMpXLU6OIqdnZbDa9hlEFgN2C6MoSmcfo6BX8Ruvyzqc2f+FNDGwjCGiAlxes3ZhcSwFjsQIDAQABo4ID9DCCA/AwHwYDVR0jBBgwFoAUPdNQpdagre7zSmAKZdMh1Pj41g8wHQYDVR0OBBYEFCqAuKQ3S0o1NBRkMZ7we/y2w6CTMCcGA1UdEQQgMB6CC21vemlsbGEub3Jngg93d3cubW96aWxsYS5vcmcwDgYDVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjB1BgNVHR8EbjBsMDSgMqAwhi5odHRwOi8vY3JsMy5kaWdpY2VydC5jb20vc2hhMi1ldi1zZXJ2ZXItZzEuY3JsMDSgMqAwhi5odHRwOi8vY3JsNC5kaWdpY2VydC5jb20vc2hhMi1ldi1zZXJ2ZXItZzEuY3JsMEsGA1UdIAREMEIwNwYJYIZIAYb9bAIBMCowKAYIKwYBBQUHAgEWHGh0dHBzOi8vd3d3LmRpZ2ljZXJ0LmNvbS9DUFMwBwYFZ4EMAQEwgYgGCCsGAQUFBwEBBHwwejAkBggrBgEFBQcwAYYYaHR0cDovL29jc3Au ZGlnaWNlcnQuY29tMFIGCCsGAQUFBzAChkZodHRwOi8vY2FjZXJ0cy5kaWdpY2Vy dC5jb20vRGlnaUNlcnRTSEEyRXh0ZW5kZWRWYWxpZGF0aW9uU2VydmVyQ0EuY3J0 MAwGA1UdEwEB/wQCMAAwggH3BgorBgEEAdZ5AgQCBIIB5wSCAeMB4QB1AKS5CZC0 GFgUh7sTosxncAo8NZgE+RvfuON3zQ7IDdwQAAABWEtou44AAAQDAEYwRAIgadQv Taz8vG28WPPQyoD32Nfvekz/WfdMdTjc88YcYC4CIBncp5Yqet7J3JSiNWJnbaeW tBvTjoO6vudBurSFaqWmAHYAaPaY+B9kgr46jO65KB1M/HFRXWeT1ETRCmesu09P +8QAAAFYS2i7XQAABAMARzBFAiEAxbQYHhg6zA3Q7Y1hdXNVtd2yaOg1g4iIV38V eG2WBoMCIAT2azrUy9ndA3hZPPk2hV8YTEItIocJB81F/J4wf2NMAHcAVhQGmi/X wuzT9eG9RLI+x0Z2ubyZEVzA75SYVdaJ0N0AAAFYS2i7+gAABAMASDBGAiEA4/5v iFhhenp07noR8YSkvuiHF+D+6fmDhqcH2shxiboCIQCyPAVUuxnyrWK3PPDbqGx4YPi5i5DIQUbyT/UiqaOVtwB3AO5Lvbd1zmC64UJpH6vhnmajD35fsHLYgwDEe4l6qP3LAAABWEtovaIAAAQDAEgwRgIhAJ1S5/U2TqjMRHM8WLpZ+SRroBRoFXqLLj0kEffVe9MtAiEAgxkb74Z6pNVKx898PkNtxICcVRDah4loTSFsftgMAjYwDQYJKoZI hvcNAQELBQADggEBAAAxqPv0YMMRvgwOIKr5s6DqE4fUdkntQZn2y8VkLyNPodUP 5s64ZbnNcceubSPwgqbrXAEVdn2YLyFde1j/npTRfvQH4nPjN8zmIdZFQ/7FYp9bTUFQbouea6gf8/pVUgIFa0945hikojNzIXATFynDFFarpx+h957jOGlfhkXqFEK0cPrikLhxDrI5LWDv8tcJSW971gDngSY8N3htFgvDkCMVhBuQM02UTW++WuCe5rzWk8vQ3NfJoqy3Vm3YhRpOTF3UFbTXCpmzAb1hgt+iz4k1soCJo9YwOewwd5aS8Bk2+vjtOafBNN6UdLa4WjRX+JnX5wIANzL9azCzLUc=`;
}

function getWwwLetsEncryptCertificate(){
  return `-----BEGIN CERTIFICATE-----
  MIIH6DCCBtCgAwIBAgISA1lBEVfWtOXTB9Ad3wq8Wx/uMA0GCSqGSIb3DQEBCwUA
  MEoxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MSMwIQYDVQQD
  ExpMZXQncyBFbmNyeXB0IEF1dGhvcml0eSBYMzAeFw0xODA1MTgxNzQyNDFaFw0x
  ODA4MTYxNzQyNDFaMB4xHDAaBgNVBAMTE3d3dy5sZXRzZW5jcnlwdC5vcmcwggEi
  MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDaiZS4ozPd7K447MqZVNlfYIQK
  vdqDBb2jh8Lpy6cWKdeEt9dD4ef4e2vQcABxowT9IG0abWrqpihB/wtx9xz9Azwg
  jn5S6OgyyUwzGLrgwJ6W4lymOuo3hMbwD9xRzhFv9k55jl0BOrBOm1AEyoG3xeD2
  bMKIzbL7RuZlRPArjdPdkjg5/vGfof6aikUjw+aLJ0AxRRCebRjCM6luHpHNRY8Y
  W4JDzhAjctvNllJmgjiKXy3FveAqGGv/T7o9Bzho4nYTyeBJ43seB5V2ep444/4C
  f1APmDicquZadLCwuOyYQTxXujZAQqRGxpBSIKdPkKi2+KA2+a4Lvc3TPjgxAgMB
  AAGjggTyMIIE7jAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEG
  CCsGAQUFBwMCMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFK0X+Jc2voF/BQJtB+2t
  9WrNhveDMB8GA1UdIwQYMBaAFKhKamMEfd265tE5t6ZFZe/zqOyhMG8GCCsGAQUF
  BwEBBGMwYTAuBggrBgEFBQcwAYYiaHR0cDovL29jc3AuaW50LXgzLmxldHNlbmNy
  eXB0Lm9yZzAvBggrBgEFBQcwAoYjaHR0cDovL2NlcnQuaW50LXgzLmxldHNlbmNy
  eXB0Lm9yZy8wggHxBgNVHREEggHoMIIB5IIbY2VydC5pbnQteDEubGV0c2VuY3J5
  cHQub3JnghtjZXJ0LmludC14Mi5sZXRzZW5jcnlwdC5vcmeCG2NlcnQuaW50LXgz
  LmxldHNlbmNyeXB0Lm9yZ4IbY2VydC5pbnQteDQubGV0c2VuY3J5cHQub3Jnghxj
  ZXJ0LnJvb3QteDEubGV0c2VuY3J5cHQub3Jngh9jZXJ0LnN0YWdpbmcteDEubGV0
  c2VuY3J5cHQub3Jngh9jZXJ0LnN0Zy1pbnQteDEubGV0c2VuY3J5cHQub3JngiBj
  ZXJ0LnN0Zy1yb290LXgxLmxldHNlbmNyeXB0Lm9yZ4ISY3AubGV0c2VuY3J5cHQu
  b3JnghpjcC5yb290LXgxLmxldHNlbmNyeXB0Lm9yZ4ITY3BzLmxldHNlbmNyeXB0
  Lm9yZ4IbY3BzLnJvb3QteDEubGV0c2VuY3J5cHQub3Jnghtjcmwucm9vdC14MS5s
  ZXRzZW5jcnlwdC5vcmeCD2xldHNlbmNyeXB0Lm9yZ4IWb3JpZ2luLmxldHNlbmNy
  eXB0Lm9yZ4IXb3JpZ2luMi5sZXRzZW5jcnlwdC5vcmeCFnN0YXR1cy5sZXRzZW5j
  cnlwdC5vcmeCE3d3dy5sZXRzZW5jcnlwdC5vcmcwgf4GA1UdIASB9jCB8zAIBgZn
  gQwBAgEwgeYGCysGAQQBgt8TAQEBMIHWMCYGCCsGAQUFBwIBFhpodHRwOi8vY3Bz
  LmxldHNlbmNyeXB0Lm9yZzCBqwYIKwYBBQUHAgIwgZ4MgZtUaGlzIENlcnRpZmlj
  YXRlIG1heSBvbmx5IGJlIHJlbGllZCB1cG9uIGJ5IFJlbHlpbmcgUGFydGllcyBh
  bmQgb25seSBpbiBhY2NvcmRhbmNlIHdpdGggdGhlIENlcnRpZmljYXRlIFBvbGlj
  eSBmb3VuZCBhdCBodHRwczovL2xldHNlbmNyeXB0Lm9yZy9yZXBvc2l0b3J5LzCC
  AQYGCisGAQQB1nkCBAIEgfcEgfQA8gB3ANt0r+7LKeyx/so+cW0s5bmquzb3hHGD
  x12dTze2H79kAAABY3SPqN4AAAQDAEgwRgIhAPqbX+855PrHr3JISaWqIgXsjfUM
  nvDxusXG1GIZ5aAMAiEAso47wrG0SLiCFs/3XJbv1G8gTtqdf3OP6LBGXyp64kwA
  dwApPFGWVMg5ZbqqUPxYB9S3b79Yeily3KTDDPTlRUf0eAAAAWN0j6jUAAAEAwBI
  MEYCIQCyr00TYCBxIwjsPY5Hx5jE810bYPriKwCDmRKI3rDfbwIhAMlGIGRWM2V0
  M1NOnAJbmHaOgA6dTIdRY8ojt4cq3MErMA0GCSqGSIb3DQEBCwUAA4IBAQBGIs7U
  u4jT4S9wIegaUKO3fMh56iBC4FoNAscEqN8NDnRVRLB9Vh89Wd131iAEaDSOzVQE
  npcY+wa2h4VFQeXcRqWhPN5cXMK6k+CMgiGZGcFKIGAA6PCttLxZzFBJGl7Ike3Y
  rgkNzLgPRAOi8SYPZEXN7REKXSNoB706IA30HSNta0N3Fq5YovEXt1ayhTBp1r/9
  Bk8UqBv0WQ1u39/VCX9PsxbOwoY/af/+dZjkmOypGnsOi1Zid2MzngYTP5nFHEyI
  UuvUVGWBVt4T+EJzkhCYVhXZaDMpbR7QIIclit4TSKB9EEdPc/wUWCYGyimkprP5
  4yQCprHE5AH7X6Kz
  -----END CERTIFICATE-----
  `;
}