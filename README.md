# mod-url
[![Build Status](https://travis-ci.com/Marvin9/mod-url.svg?branch=master)](https://travis-ci.com/Marvin9/mod-url)
[![DeepScan grade](https://deepscan.io/api/teams/6570/projects/9330/branches/119830/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=6570&pid=9330&bid=119830)

```
npm i mod-url
```

``` javascript
const mod = require('mod-url');

console.log(mod.parse('github.com').done());
// https://github.com/
```

## Use

- ### pass only domain.

``` javascript
console.log(mod.parse('github').done());
// https://github.com/
```

- ### pass full url.

``` javascript
console.log(mod.parse('http://www.github.com/Marvin9').done());
// http://www.github.com/Marvin9
```

- ### modify protocol scheme.

``` javascript
let url = mod.parse('github');
url = url.protocol('http');

// or
// url = mod.parse('github').protocol('http').done();

console.log(url.done());
// http://github.com/
```

- ### modify subdomain.

``` javascript
const url = mod.parse('github').subdomain('www').done();

console.log(url);
// https://www.github.com/
```

``` javascript
const url = mod.parse('www.github.com').subdomain('x.y').done();

console.log(url);
// https://x.y.github.com/
```

> **To remove subdomain. Do not pass null argument. Instead pass empty string**

``` javascript
const url = mod.parse('www.github.com').subdomain('').done();

console.log(url);
// https://github.com/
```

- ### modify domain.

``` javascript
const url = mod.parse('yahoo.com/search?q=query').domain('google').done();

console.log(url);
// https://google.com/search?q=query
```

> **You cannot remove domain. ie .domain('') wont work**

- ### modify domain extension

``` javascript
const url = mod.parse('google.com/search?q=query').domainext('uk').done();

console.log(url);
// https://google.uk/search?q=query
```

- ### modify port

``` javascript
const url = mod.parse('google.com').port(80).done();

console.log(url);
// https://google:80.com/
```

- ### modify path (including query)

``` javascript
const url = mod.parse('google.com/path/to?q=q1').path('onlypath').done();

console.log(url);
// https://google.com/onlypath
```

``` javascript
const url = mod.parse('github.com/daunting/long/path/not/required/to/you').path('').done();

console.log(url);
// https://github.com/
```

- ### modify path (excluding query)

``` javascript
const url = mod.parse('google.com/version1?q=query').onlypath('version2').done();

console.log(url);
// https://google.com/version2?q=query
```

- ### modify query

``` javascript
const url = mod.parse('google.com/search?q=query').query('foo=bar&baz=foo').done();

console.log(url);
// https://google.com/seach?foo=bar&baz=foo
```

- ### chain modify functions as you want

``` javascript
const url = mod.parse('something').path('/random?query=unknown').protocol('http').subdomain('www').domainext('foo').port('90').domain('something-else').done();

console.log(url);
// http://www.something-else:90.foo/random?query=unknown
```

> **Do not forget to add .done() at last**

- ### DO NOT

``` javascript
const url1 = mod.parse('google');

const url2 = mod.parse('github');

console.log(url1.done());
// https://github.com

console.log(url2.done());
// https://github.com
```

``` javascript
// solution for above behavior
const url1 = mod.parse('google').done();
const url2 = mod.parse('github').done();

console.log(url1);
console.log(url2);
```
