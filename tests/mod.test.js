const mod = require('../lib/mod');

describe('modifier', () => {
  test('modifier->protocol should set default https as protocol', () => {
    const google = mod.parse('google.com');
    expect(google.parsedurl.protocol).toBe('https');
  });

  test('modifier->protocol should change protocol in object', () => {
    let google = mod.parse('google.com');
    google = google.protocol('ftp');

    expect(google.parsedurl.protocol).toBe('ftp');
  });

  test('modifier->subdomain should set default www as subdomain', () => {
    const google = mod.parse('google.com');
    expect(google.parsedurl.subdomain).toBe('');
  });

  test('modifier->subdomain should change subdomain in object', () => {
    let google = mod.parse('google.com');
    google = google.subdomain('newsubdomain');
    expect(google.parsedurl.subdomain).toBe('newsubdomain');
  });

  test('modifier->subdomain subdomain with multiple dots are possible', () => {
    let google = mod.parse('google.com');
    google = google.subdomain('first.second');
    expect(google.parsedurl.subdomain).toBe('first.second');
  });

  test('modifier->domain should be able to change domain in object', () => {
    const google = mod.parse('google.com').domain('facebook');
    expect(google.parsedurl.domain).toBe('facebook');
  });

  test('modifier->domainext should be able to change domain extension in object', () => {
    const google = mod.parse('google.com').domainext('uk');
    expect(google.parsedurl.domainext).toBe('uk');
  });

  test('modifier->port should be able to change port in object', () => {
    const google = mod.parse('google.com').port(80);
    const portInString = mod.parse('google.com').port('80');

    expect(google.parsedurl.port).toBe('80');
    expect(portInString.parsedurl.port).toBe('80');
  });

  test('modifier->path should be able to change path, onlypath & query in object', () => {
    const google = mod.parse('google.com').path('hello/world');
    expect(google.parsedurl.path).toBe('/hello/world');
    expect(google.parsedurl.onlypath).toBe('/hello/world');
    expect(google.parsedurl.query).toBe('');

    const pathWithQuery = mod.parse('google.com/path/x?q=y').path('onlyhello');
    expect(pathWithQuery.parsedurl.path).toBe('/onlyhello');
    expect(pathWithQuery.parsedurl.onlypath).toBe('/onlyhello');
    expect(pathWithQuery.parsedurl.query).toBe('');
  });

  test('any function of modifier must not change anything if input is null or undefined', () => {
    const standard = 'https://google.com/';
    let google = mod.parse('google.com');
    google = google.protocol(null).subdomain(null).domain(null).domainext(null).port(null).onlypath(null).path(null).query(null).done();
    expect(google).toBe(standard);
    google = mod.parse('google.com');
    google = google.protocol(undefined).subdomain(undefined).domain(undefined).domainext(undefined).port(undefined).onlypath(undefined).path(undefined).query(undefined).done();
    expect(google).toBe(standard);
  });

  test('all modifier function must return this', () => {
    const google = mod.parse('google.com');
    let anotherGoogle = google.protocol('ftp');
    typeObj(anotherGoogle);
    anotherGoogle = google.subdomain('infra');
    typeObj(anotherGoogle);
    anotherGoogle = google.domain('any');
    typeObj(anotherGoogle);
    anotherGoogle = google.domainext('in');
    typeObj(anotherGoogle);
    anotherGoogle = google.port(80);
    typeObj(anotherGoogle);
    anotherGoogle = google.path('somepath/oh');
    typeObj(anotherGoogle);
    anotherGoogle = google.onlypath('some/another/path');
    typeObj(anotherGoogle);
    anotherGoogle = google.query('x=y');
    typeObj(anotherGoogle);
  });
});

function typeObj(instance) {
  expect(typeof instance).toBe('object');
}
