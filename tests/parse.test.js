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
