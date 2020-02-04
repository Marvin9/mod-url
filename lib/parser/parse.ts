import { parsedurlType, modType } from '../../config/interfaces';

const { addColonLast, isGarbage } = require('../utils');

function parse(URL: string): modType {
  const url: string = `${URL}`;
  let modurl: string;

  const parsedurl: parsedurlType = {
    protocol: null,
    subdomain: null,
    domain: null,
    domainext: null,
    port: null,
    path: null,
    query: null,
    onlypath: null,
  };

  if (isGarbage(URL) || URL.length > 2048) {
    this.parsedurl = parsedurl;
    return this;
  }

  // protocol finder
  let colonSlashSlash = url.indexOf('://');

  if (colonSlashSlash !== -1) {
    const splt = url.split('://');
    const protocol = splt[0] === '' ? 'https' : splt[0];

    parsedurl.protocol = protocol.toLowerCase();
    modurl = `${parsedurl.protocol}://${splt[1]}${addColonLast(splt[1]) ? '/' : ''}`;
  } else {
    // TODO -> MAILTO
    parsedurl.protocol = 'https';
    modurl = `${parsedurl.protocol}://${url}${addColonLast(url) ? '/' : ''}`;
  }

  // domain processor
  const slashWherePathStarts = modurl.indexOf('/', parsedurl.protocol.length + 3);

  if (slashWherePathStarts - parsedurl.protocol.length - 3 === 0) throw new Error('Invalid URL. It cannot start with /');

  colonSlashSlash = modurl.indexOf('://');
  if (slashWherePathStarts !== -1) {
    const extractMiddle = modurl.slice(colonSlashSlash + 3, slashWherePathStarts);
    const middle = extractMiddle.split('.');
    const numberOfDots = middle.length - 1;

    switch (numberOfDots) {
      case 0: {
        Object.assign(parsedurl, {
          subdomain: '',
          domain: middle[0],
          domainext: 'com',
        });
        break;
      }

      case 1: {
        Object.assign(parsedurl, {
          subdomain: '',
          domain: middle[0],
          domainext: middle[1],
        });
        break;
      }

      case 2: {
        Object.assign(parsedurl, {
          subdomain: middle[0],
          domain: middle[1],
          domainext: middle[2],
        });
        break;
      }

      default: {
        if (!(numberOfDots < 0)) {
          Object.assign(parsedurl, {
            domainext: middle.pop(),
            domain: middle.pop(),
            subdomain: middle.join('.'),
          });
        }
        break;
      }
    }

    // port from domain
    const { domain } = parsedurl;
    const colonInDomain = domain.indexOf(':');
    if (colonInDomain !== -1) {
      parsedurl.port = domain.slice(colonInDomain + 1);
      // eslint-disable-next-line
      if (isNaN(+parsedurl.port)) throw new Error('Port cannot be alphabet.');
    }

    // path extraction
    parsedurl.path = modurl.slice(slashWherePathStarts);
    const { path } = parsedurl;
    const questionMark = path.indexOf('?');

    parsedurl.onlypath = path;

    if (questionMark !== -1) {
      parsedurl.onlypath = path.slice(0, questionMark);
      parsedurl.query = path.slice(questionMark + 1);
    }
  }

  this.parsedurl = parsedurl;
  return this;
}

module.exports = parse;
