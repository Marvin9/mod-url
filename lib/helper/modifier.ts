import { modType } from '../../config/interfaces';

function protocol(prtcl: string): modType {
  this.parsedurl.protocol = prtcl;
  return this;
}

function subdomain(sbdm: string): modType {
  this.parsedurl.subdomain = sbdm;
  return this;
}

function domain(dm: string): modType {
  this.parsedurl.domain = dm;
  return this;
}

function domainext(ext: string): modType {
  this.parsedurl.domainext = ext;
  return this;
}

function port(prt: string | number): modType {
  if (prt === null || prt === undefined) return this;
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
