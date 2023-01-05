

export const store = () => {
  return {
    username: null,
    token: null,
    setUsername(username) {
      this.username = username;
    },
    setToken(token) {
      this.token = token;
    },
  };
};
