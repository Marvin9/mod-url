import { modType } from '../config/interfaces';

const parse = require('./parser/parse');
const {
  protocol,
  subdomain,
  domain,
  port,
  domainext,
  onlypath,
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
  done,
};

module.exports = { ...mod };
