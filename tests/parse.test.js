const mod = require('../lib/mod');

function randomString(number) {
  let s = '';
  const char = "abcdefghijklmnopqrstuvwxyz";
  const charlen = char.length;
  for (let i = 0; i < number; i++) {
    s += Math.floor(Math.random * charlen);
  }
  return s;
}

test('it should return with all null values -> for empty url or url with more than 2048 characters or null or undefined url', () => {
  const emptyParse = mod.parse('');
  const moreCharParse = mod.parse(randomString(2049));
  const nullParse = mod.parse(null);
  const undefinedParse = mod.parse(undefined);

  const op = ({
    protocol: null,
    subdomain: null,
    domain: null,
    port: null,
    path: null,
    query: null,
    onlypath: null,
  }).toString();

  expect(emptyParse.toString()).toBe(op);
  expect(moreCharParse.toString()).toBe(op);
  expect(nullParse.toString()).toBe(op);
  expect(undefinedParse.toString()).toBe(op);
});


test('it should identify protocol', () => {
  const google = mod.parse('https://google.com');
  // const mailto = mod.parse('mailto:x@y.com');
  expect(google.parsedurl.protocol).toBe('https');
  const other = mod.parse('ftp://x@y.com');
  expect(other.parsedurl.protocol).toBe('ftp');
});

test('it should add protocol if not present', () => {
  const google = mod.parse('google.com');
  expect(google.parsedurl.protocol).toBe('https');
});

test('it should identify middle (hostname)', () => {
  const github = mod.parse('https://google.com');
  expect(github.parsedurl.domain).toBe('google');
  expect(github.parsedurl.domainext).toBe('com');
  expect(github.parsedurl.subdomain).toBe('www'); // default assign www

  const google = mod.parse('http://www.facebook.uk/x/y');
  expect(google.parsedurl.domain).toBe('facebook');
  expect(google.parsedurl.subdomain).toBe('www');
  expect(google.parsedurl.domainext).toBe('uk');

  const multipleDot = mod.parse('x.y.z.google.com');
  expect(multipleDot.parsedurl.domain).toBe('google');
  expect(multipleDot.parsedurl.subdomain).toBe('x.y.z');
  expect(multipleDot.parsedurl.domainext).toBe('com');

  const zeroDot = mod.parse('google');
  expect(zeroDot.parsedurl.domain).toBe('google');
});

test('it should identify port', () => {
  const urlWithPort = mod.parse('google:80.com');
  expect(urlWithPort.parsedurl.port).toBe('80');

  const complexUrl = mod.parse('https://x.y.z.google:8000.com/x/y/z');
  expect(complexUrl.parsedurl.port).toBe('8000');

  const nullPort = mod.parse('google.com');
  expect(nullPort.parsedurl.port).toBe(null);
});

test('it should identify path', () => {
  const noPath = mod.parse('google.com');
  expect(noPath.parsedurl.path).toBe('/');
  expect(noPath.parsedurl.onlypath).toBe('/');

  const goodPath = mod.parse('github.com/Marvin9/repo/master');
  expect(goodPath.parsedurl.path).toBe('/Marvin9/repo/master');
  expect(goodPath.parsedurl.onlypath).toBe('/Marvin9/repo/master');

  const pathWithQuery = mod.parse('google.com/search?q=mod-url&location=india');
  expect(pathWithQuery.parsedurl.path).toBe('/search?q=mod-url&location=india');
});

test('it should identify only path (no query)', () => {
  const pathWithQuery = mod.parse('google.com/search?q=mod-url&location=india');
  expect(pathWithQuery.parsedurl.onlypath).toBe('/search');
});

test('it should identify only query', () => {
  const pathWithQuery = mod.parse('google.com/search?q=mod-url&location=india');
  expect(pathWithQuery.parsedurl.query).toBe('q=mod-url&location=india');
});
