const addColonLast = (url: string): boolean => (
  url.indexOf('/') === -1
);

const isGarbage = (value: any, emptyString: boolean = false): boolean => (
  value === null || value === undefined || (emptyString && typeof value === 'string' && value === '')
);

module.exports = {
  addColonLast,
  isGarbage,
};
