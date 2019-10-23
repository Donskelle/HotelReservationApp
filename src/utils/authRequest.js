const createAxiosAuthConfig = getState => {
  const { token } = getState().user;
  const config = {};
  config.headers = {
    Authorization: `Bearer ${token}`
  };

  return config;
};

// eslint-disable-next-line import/prefer-default-export
export { createAxiosAuthConfig };
