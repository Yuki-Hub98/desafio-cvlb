export const getToken = () => sessionStorage.getItem('token');

export const setToken = (token: string) => {
  sessionStorage.setItem('token', token);
};

export const clearToken = () => {
  sessionStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const getUsername = () => sessionStorage.getItem('username');

export const setUsername = (username: string) => {
  sessionStorage.setItem('username', username);
};
