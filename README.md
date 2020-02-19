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

console.log(mod.parse('http://google.com')
  .protocol('https')
  .subdomain('www')
  .domainext('in')
  .path('search?q=query')
  .fragment('foo')
  .done());
// https://www.google.in/search?q=query#foo
```

## API

### ***.parse(url)*** -> parse url.

**example of accepted url types :** ***github***, ***github.com***, ***www.github.com***, ***http://www.github.com***, ***https://github.com***, ***github.com/path***

``` javascript
const gh = mod.parse('github');
```

### ***.done()*** -> get modified string.

``` javascript
console.log(gh.done());
// https://github.com/
```

### ***.protocol(string)*** -> modify protocol scheme.

``` javascript
let url = mod.parse('github');
url = url.protocol('http');

// or
// url = mod.parse('github').protocol('http').done();

console.log(url.done());
// http://github.com/
```

### ***.subdomain(string)*** -> modify subdomain.

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

### ***.domain(string)*** -> modify domain.

``` javascript
const url = mod.parse('yahoo.com/search?q=query').domain('google').done();

console.log(url);
// https://google.com/search?q=query
```

``` javascript
const url = mod.parse('google.com').domain('www.google.in').done();

console.log(url);
// https://www.google.in/
```

``` javascript
const url = mod.parse('google').domain('google.in').done();

console.log(url);
// https://google.in/
```

> **You cannot remove domain. ie .domain('') wont work**

### ***.domainext(string)*** ->  modify domain extension

``` javascript
const url = mod.parse('google.com/search?q=query').domainext('uk').done();

console.log(url);
// https://google.uk/search?q=query
```

### ***.port(string | number)*** -> modify port

``` javascript
const url = mod.parse('google.com').port(80).done();

console.log(url);
// https://google:80.com/
```

### ***.path(string)*** -> modify full path

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

### ***.onlypath(string)*** -> modify path (excluding query & fragment)

``` javascript
const url = mod.parse('google.com/version1?q=query').onlypath('version2').done();

console.log(url);
// https://google.com/version2?q=query
```

### ***.query(string)*** -> modify query

``` javascript
const url = mod.parse('google.com/search?q=query').query('foo=bar&baz=foo').done();

console.log(url);
// https://google.com/seach?foo=bar&baz=foo
```

### ***.fragment(string)*** -> modify fragment

``` javascript
const url = mod.parse('google.com/hi').fragment('#hello').done();

console.log(url);
// https://google.com/hi#hello
```

## **chain modify functions as you want**

``` javascript
const url = mod.parse('something').path('/random?query=unknown').protocol('http').subdomain('www').domainext('foo').port('90').domain('something-else').done();

console.log(url);
// http://www.something-else:90.foo/random?query=unknown
```

> **Do not forget to add .done() at last**

### DO NOT - (mod-url is mutable)

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
