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

  test('modifier->domain should be able to change domain as well as domain extension', () => {
    const google = mod.parse('http://www.google.com').domain('google.com');
    expect(google.parsedurl.domain).toBe('google');
    expect(google.parsedurl.domainext).toBe('com');
    // there should be no side effect on subdomain
    expect(google.parsedurl.subdomain).toBe('www');
  });

  test('modifier->domain should be able to change domain, extension and subdomain', () => {
    const google = mod.parse('google.com').domain('www.google.uk');
    expect(google.parsedurl.domain).toBe('google');
    expect(google.parsedurl.domainext).toBe('uk');
    expect(google.parsedurl.subdomain).toBe('www');
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

  test('modifier->path should be able to change path, onlypath, query & fragment in object', () => {
    const google = mod.parse('google.com').path('hello/world#good');
    expect(google.parsedurl.path).toBe('/hello/world#good');
    expect(google.parsedurl.onlypath).toBe('/hello/world');
    expect(google.parsedurl.query).toBe('');
    expect(google.parsedurl.fragment).toBe('#good');

    const pathWithQuery = mod.parse('google.com/path/x?q=y').path('onlyhello');
    expect(pathWithQuery.parsedurl.path).toBe('/onlyhello');
    expect(pathWithQuery.parsedurl.onlypath).toBe('/onlyhello');
    expect(pathWithQuery.parsedurl.query).toBe('');
    expect(pathWithQuery.parsedurl.fragment).toBe(null);

    const emptyPath = mod.parse('google.com/x/y?foo=bar#baz').path('');
    expect(emptyPath.parsedurl.path).toBe('/');
    expect(emptyPath.parsedurl.onlypath).toBe('/');
    expect(emptyPath.parsedurl.query).toBe('');
    expect(emptyPath.parsedurl.fragment).toBe('');

    const replacePath = mod.parse('good-site.com/foo/bar?baz=k#a').path('x/y?foo=bar#dude');
    expect(replacePath.parsedurl.path).toBe('/x/y?foo=bar#dude');
    expect(replacePath.parsedurl.onlypath).toBe('/x/y');
    expect(replacePath.parsedurl.query).toBe('?foo=bar');
    expect(replacePath.parsedurl.fragment).toBe('#dude');
  });

  test('modifier->fragment should be able to change fragment and path accordingly', () => {
    const google = mod.parse('google.com').fragment('hello');
    expect(google.parsedurl.fragment).toBe('#hello');
    expect(google.parsedurl.path).toBe('/#hello');

    // no side effect on query and set only path to /
    expect(google.parsedurl.onlypath).toBe('/');
    expect(google.parsedurl.query).toBe(null);

    const withPath = mod.parse('google.com/hello#hi').fragment('bye');
    expect(withPath.parsedurl.fragment).toBe('#bye');
    expect(withPath.parsedurl.path).toBe('/hello#bye');

    const withQry = mod.parse('google.com/hi?q=query#fragment').fragment('any');
    expect(withQry.parsedurl.fragment).toBe('#any');
    expect(withQry.parsedurl.path).toBe('/hi?q=query#any');

    const removeFragment = mod.parse('google.com/hi?foo=bar#baz').fragment('');
    expect(removeFragment.parsedurl.fragment).toBe('');
    expect(removeFragment.parsedurl.path).toBe('/hi?foo=bar')
  });

  test('any function of modifier must not change anything if input is null or undefined', () => {
    const standard = 'https://google.com/';
    let google = mod.parse('google.com');
    google = google.protocol(null).subdomain(null).domain(null).domainext(null).port(null).onlypath(null).path(null).query(null).fragment(null).done();
    expect(google).toBe(standard);
    google = mod.parse('google.com');
    google = google.protocol(undefined).subdomain(undefined).domain(undefined).domainext(undefined).port(undefined).onlypath(undefined).path(undefined).query(undefined).fragment(undefined).done();
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
    anotherGoogle = google.fragment('hello');
    typeObj(anotherGoogle);
  });
});

function typeObj(instance) {
  expect(typeof instance).toBe('object');
}
