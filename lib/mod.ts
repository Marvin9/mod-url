import { modType } from '../config/interfaces';

const parse = require('./parser/parse');
const {
  protocol,
  subdomain,
  domain,
  port,
  domainext,
  onlypath,
  path,
  query,
  done,
} = require('./helper/modifier');

const mod: modType = {
  url: '',
  parsedurl: null,
  parse,
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

module.exports = { ...mod };
