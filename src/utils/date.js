const createNowIsoDate = () => new Date().toISOString().substr(0, 10);

// eslint-disable-next-line import/prefer-default-export
export { createNowIsoDate };
