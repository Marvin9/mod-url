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
  if (isGarbage(dm)) return this;
  this.parsedurl.domain = dm;
  return this;
}

function domainext(ext: string): modType {
  if (isGarbage(ext)) return this;
  this.parsedurl.domainext = ext;
  return this;
}

function port(prt: string | number): modType {
  if (isGarbage(prt)) return this;
  this.parsedurl.port = `${prt}`;
  return this;
}

function done(): string {
  const {
    protocol, subdomain, domain, domainext, port, path // eslint-disable-line
  } = this.parsedurl;
  return `${protocol}://${subdomain ? `${subdomain}.` : ''}${domain}${port === null ? '' : `:${port}`}.${domainext}${path}`;
}

module.exports = {
  protocol,
  subdomain,
  domain,
  port,
  domainext,
  done,
};
