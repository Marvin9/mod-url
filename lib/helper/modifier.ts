import { modType } from '../../config/interfaces';

const { isGarbage } = require('../utils');

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
  // eslint-disable-next-line no-shadow
  let { path } = this.parsedurl;
  path = path.split('?');
  path[0] = newOp;
  this.parsedurl.path = path.join('?');
  return this;
}

function path(pth: string): modType {
  if (isGarbage(pth)) return this;
  let newPth = pth;
  if (newPth[0] !== '/') {
    newPth = `/${pth}`;
  }
  const queryExist = newPth.indexOf('?') !== -1;
  if (queryExist) {
    const [onlyPth, query] = newPth.split('?'); // eslint-disable-line
    this.parsedurl.query = `?${query}`;
    this.parsedurl.onlypath = onlyPth;
  } else {
    this.parsedurl.query = '';
    this.parsedurl.onlypath = newPth;
  }
  this.parsedurl.path = newPth;
  return this;
}

function query(qry: string): modType {
  if (isGarbage(qry)) return this;
  let newQry = qry;
  if (qry[0] !== '?') {
    newQry = `?${qry}`;
  }
  this.parsedurl.query = newQry;
  const [path] = this.parsedurl.path.split('?'); // eslint-disable-line
  this.parsedurl.path = [path, newQry.slice(1)].join('?');
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
  done,
};
