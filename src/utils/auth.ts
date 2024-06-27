export const logout = () => {
  localStorage.removeItem('accessToken');
  document.cookie =
    'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
};
