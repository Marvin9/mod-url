const addColonLast = (url: string): boolean => (
  url.indexOf('/') === -1
);

const isGarbage = (value: any): boolean => (
  value === null || value === undefined || (typeof value === 'string' && value === '')
);

module.exports = {
  addColonLast,
  isGarbage,
};
