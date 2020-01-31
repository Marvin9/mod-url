import { modType } from '../config/interfaces';

const parse = require('./parser/parse');
const {
  protocol,
  subdomain,
  domain,
  domainext,
  do,
} = require('./helper/modifier');

const mod: modType = {
  url: '',
  parsedurl: null,
  parse,
  protocol,
  subdomain,
  domain,
  domainext,
  do,
};

module.exports = mod;
