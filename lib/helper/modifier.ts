import { modType } from '../../config/interfaces';

const { isGarbage, portProcessor } = require('../utils');

function protocol(prtcl: string): modType {
  if (isGarbage(prtcl)) return this;
  this.parsedurl.protocol = prtcl;
  return this;
}

function subdomain(sbdm: string): modType {
  if (isGarbage(sbdm)) return this;
  this.parsedurl.subdomain = sbdm;
  return this;
}

function domain(dm: string): modType {
  if (isGarbage(dm, true)) return this;
  const dmSplit = dm.split('.');
  const len = dmSplit.length;

  if (len === 1) {
    this.parsedurl.domain = dm;
  } else {
    this.parsedurl.domainext = dmSplit.pop();
    this.parsedurl.domain = dmSplit.pop();
    if (dmSplit.length) this.parsedurl.subdomain = dmSplit.join('.');
  }

  // port finder
  this.parsedurl = portProcessor(this.parsedurl);
  return this;
}

function domainext(ext: string): modType {
  if (isGarbage(ext, true)) return this;
  this.parsedurl.domainext = ext;
  return this;
}

function port(prt: string | number): modType {
  if (isGarbage(prt)) return this;
  this.parsedurl.port = `${prt}`;
  return this;
}

function onlypath(op: string): modType {
  if (isGarbage(op)) return this;
  let [newOp] = op.split('?');
  const firstChar = newOp[0];
  if (firstChar !== '/') {
    newOp = `/${op}`;
  }
  this.parsedurl.onlypath = newOp;
  const { query, fragment } = this.parsedurl; // eslint-disable-line
  this.parsedurl.path = `${this.parsedurl.onlypath}${isGarbage(query, true) ? '' : `?${query}`}${isGarbage(fragment, true) ? '' : fragment}`;
  return this;
}

function path(pth: string): modType {
  if (isGarbage(pth)) return this;

  if (pth === '') {
    this.parsedurl.path = '/';
    this.parsedurl.onlypath = '/';
    this.parsedurl.query = '';
    this.parsedurl.fragment = '';
    return this;
  }

  let newPth = pth;
  if (newPth[0] !== '/') {
    newPth = `/${pth}`;
  }
  const queryExist = newPth.indexOf('?') !== -1;
  const hashExist = newPth.indexOf('#') !== -1;

  if (queryExist) {
    const [onlyPth, query] = newPth.split('?'); // eslint-disable-line
    if (hashExist) {
      const [qry, hash] = query.split('#');
      this.parsedurl.query = qry;
      this.parsedurl.fragment = `#${hash}`;
    } else this.parsedurl.query = `?${query}`;
    this.parsedurl.onlypath = onlyPth;
  } else {
    this.parsedurl.query = '';
    if (hashExist) {
      const [onlypth, hash] = newPth.split('#');
      this.parsedurl.onlypath = onlypth;
      this.parsedurl.fragment = `#${hash}`;
    } else this.parsedurl.onlypath = newPth;
  }
  this.parsedurl.path = newPth;
  return this;
}

function query(qry: string): modType {
  if (isGarbage(qry)) return this;
  let newQry = qry;
  if (qry[0] !== '?' && qry !== '') {
    newQry = `?${qry}`;
  }
  this.parsedurl.query = newQry;
  this.parsedurl.path = `${this.parsedurl.onlypath}${newQry}${this.parsedurl.fragment ? this.parsedurl.fragment : ''}`;
  return this;
}

function fragment(frg: string): modType {
  if (isGarbage(frg)) return this;
  let newFrg = frg;
  if (frg[0] !== '#' && frg !== '') {
    newFrg = `#${frg}`;
  }
  this.parsedurl.fragment = newFrg;
  const { query, fragment } = this.parsedurl; // eslint-disable-line
  this.parsedurl.path = `${this.parsedurl.onlypath}${isGarbage(query, true) ? '' : `?${query}`}${isGarbage(fragment, true) ? '' : fragment}`;
  return this;
}

function done(): string {
  const {
    protocol, subdomain, domain, domainext, port, path // eslint-disable-line
  } = this.parsedurl;
  return `${protocol ? `${protocol}://` : ''}${subdomain || subdomain !== '' ? `${subdomain}.` : ''}${domain}${port === null || port === '' ? '' : `:${port}`}.${domainext}${path}`;
}

module.exports = {
  protocol,
  subdomain,
  domain,
  port,
  domainext,
  onlypath,
  path,
  query,
  fragment,
  done,
};
