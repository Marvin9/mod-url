const addColonLast = (url: string): boolean => (
  url.indexOf('/') === -1
);

const isGarbage = (value: any): boolean => (
  value === null || value === undefined
);

module.exports = {
  addColonLast,
  isGarbage,
};
