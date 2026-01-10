export const storage = {
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  setToken: (token: string) => {
    localStorage.setItem('token', token);
  },
  
  clearToken: () => {
    localStorage.removeItem('token');
  },

  getUser: () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  setUser: (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  clearUser: () => {
    localStorage.removeItem('user');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
