import { parsedurlType } from '../config/interfaces';

const addColonLast = (url: string): boolean => (
  url.indexOf('/') === -1
);

const isGarbage = (value: any, emptyString: boolean = false): boolean => (
  value === null || value === undefined || (emptyString && typeof value === 'string' && value.trim() === '')
);

const portProcessor = (prsdurl: parsedurlType): parsedurlType => {
  const parsedurl = prsdurl;
  const { domain } = parsedurl;
  const colonInDomain = domain.indexOf(':');
  if (colonInDomain !== -1) {
    const prt = domain.slice(colonInDomain + 1);
    [parsedurl.domain] = domain.split(':');
    if (prt.trim() === '') parsedurl.port = '';
    else parsedurl.port = prt;
    // eslint-disable-next-line
    if (isNaN(+parsedurl.port)) throw new Error('')
  }
  return parsedurl;
};

const fragementProcessor = (prsdurl: parsedurlType): parsedurlType => {
  const parsedurl = prsdurl;
  const { path } = parsedurl;
  const existHash = path.indexOf('#') !== -1;
  if (existHash) {
    const [, hash] = path.split('#');
    parsedurl.fragment = `#${hash}`;
  }
  return parsedurl;
};

module.exports = {
  addColonLast,
  isGarbage,
  portProcessor,
  fragementProcessor,
};
