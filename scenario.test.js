describe('sample.html', function() {
    it('displays 42', function() {
      browser().navigateTo('/sample.html');
      // This assertion will fail
      expect(element('#content').text()).toBe('42');
    });
  });