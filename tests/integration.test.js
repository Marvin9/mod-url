const mod = require('../lib/mod');

const invalidUrls = [
  '/google.com/',
  'http:google.com',
  'https:google'
];

const URLS = [
  ['google', 'https://www.google.com/'],
  ['google.com', 'http://google.uk/'],
  ['http://google', 'http://www.google.com/']
];

test('it should throw error to invalid urls', () => {
  invalidUrls.forEach((invalidurl) => {
    try {
      mod.parse(invalidurl);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});

test('function should be able to modify given url and give desire url', () => {
  const url1 = mod.parse(URLS[0][0]).subdomain('www').done();
  expect(url1).toBe(URLS[0][1]);

  const url2 = mod.parse(URLS[1][0]).protocol('http').domainext('uk').done();
  expect(url2).toBe(URLS[1][1]);

  const url3 = mod.parse(URLS[2][0]).subdomain('www').done();
  expect(url3).toBe(URLS[2][1]);
});
