const mod = require('../lib/mod');

const invalidUrls = [
  '/google.com/',
  'http:google.com',
  'https:google'
];

const URLS = [
  ['google', 'https://www.google.com/'],
  ['google.com', 'http://google.uk/'],
  ['http://google', 'http://www.google.com/'],
  ['google.com/path', 'https://google.com/otherpath'],
  ['google.com/path?q=query', 'https://google.com/pathv2?q=query'],
  ['google.com/path?q=query', 'https://google.com/pathWithoutQuery'],
  ['google.com/path?q=query', 'https://www.bing.com/path?q=query'],
  ['google.com/path?q=query&x=y', 'https://google.com/path?q=oneQueryOnly'],
  ['google.com/path/to/some?q=query', 'https://google.com/path/to/some?q=change&x=y'],
  ['google.com/?q=query', 'https://google.com/?q=query'],
  ['google.com/?q=query', 'https://x.y.google.uk/path?q=query'],
  ['http://google', 'https://google.com/path?q=query'],
  ['www.google.com', 'https://www.google.com/'],
  ['www.google.com', 'https://google.com/']
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

  const url4 = mod.parse(URLS[3][0]).path('otherpath').done();
  expect(url4).toBe(URLS[3][1]);

  const url5 = mod.parse(URLS[4][0]).onlypath('pathv2').done();
  expect(url5).toBe(URLS[4][1]);

  const url6 = mod.parse(URLS[5][0]).path('pathWithoutQuery').done();
  expect(url6).toBe(URLS[5][1]);

  const url7 = mod.parse(URLS[6][0]).subdomain('www').domain('bing').done();
  expect(url7).toBe(URLS[6][1]);

  const url8 = mod.parse(URLS[7][0]).query('q=oneQueryOnly').done();
  expect(url8).toBe(URLS[7][1]);

  const url9 = mod.parse(URLS[8][0]).query('q=change&x=y').done();
  expect(url9).toBe(URLS[8][1]);

  const url10 = mod.parse(URLS[9][0]).done();
  expect(url10).toBe(URLS[9][1]);

  const url11 = mod.parse(URLS[10][0]).subdomain('x.y').domainext('uk').onlypath('path').done();
  expect(url11).toBe(URLS[10][1]);

  const url12 = mod.parse(URLS[11][0]).protocol('https').domainext('com').onlypath('path').query('q=query').done();
  expect(url12).toBe(URLS[11][1]);

  const url13 = mod.parse(URLS[12][0]).done();
  expect(url13).toBe(URLS[12][1]);

  const url14 = mod.parse(URLS[13][0]).subdomain('').done();
  expect(url14).toBe(URLS[13][1]);
});
