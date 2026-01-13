import api from '../../services/apiClient';
import { User } from '../../types';

export const authService = {
  // Login function
  login: async (identifier: string, password: string): Promise<User> => {
    // In a real app, you would use:
    // const response = await api.post('/auth/login', { identifier, password });
    // return response.data;

    // MOCK LOGIN for prototype
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Accept either the legacy email or the new username
        if ((identifier === 'admin@school.com' || identifier === 'DEV0001') && (password === 'admin123' || password === 'password123')) {
          const mockUser: User = {
            id: 1,
            name: 'Admin User',
            email: identifier.includes('@') ? identifier : 'dev0001@school.com',
            role: 'admin',
            token: 'mock-jwt-token-xyz',
          };
          resolve(mockUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  // Register function
  register: async (userData: any): Promise<any> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Logout function
  logout: (): void => {
    localStorage.removeItem('token');
  },
  
  // Get current user profile
  getProfile: async (): Promise<User> => {
     const response = await api.get('/auth/me');
     return response.data;
  }
};
