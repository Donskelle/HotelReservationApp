interface AxiosConfig {
  headers: {
    Authorization: string
  }
}

const createAxiosAuthConfig = (state: any) : AxiosConfig =>  {
  const { token } = state.user;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return config;
};

// eslint-disable-next-line import/prefer-default-export
export { createAxiosAuthConfig };
