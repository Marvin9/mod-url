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

  test('any function of modifier must not change anything if input is null or undefined', () => {
    const standard = 'https://google.com/';
    let google = mod.parse('google.com');
    google = google.protocol(null).subdomain(null).domain(null).domainext(null).port(null).done();
    expect(google).toBe(standard);
    google = mod.parse('google.com');
    google = google.protocol(undefined).subdomain(undefined).domain(undefined).domainext(undefined).port(undefined).done();
    expect(google).toBe(standard);
  });

  test('all modifier function must return this', () => {
    const google = mod.parse('google.com');
    let anotherGoogle = google.protocol('ftp');
    expect(typeof anotherGoogle).toBe("object");
    anotherGoogle = google.subdomain('infra');
    expect(typeof anotherGoogle).toBe("object");
    anotherGoogle = google.domain('any');
    expect(typeof anotherGoogle).toBe("object");
    anotherGoogle = google.domainext('in');
    expect(typeof anotherGoogle).toBe("object");
    anotherGoogle = google.port(80);
    expect(typeof anotherGoogle).toBe("object");
  });
});


