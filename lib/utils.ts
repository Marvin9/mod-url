const addColonLast = (url: string): boolean => (
  url.indexOf('/') === -1
);

module.exports = {
  addColonLast,
};
