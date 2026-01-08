export interface User {
  id: number | string;
  name: string;
  email: string;
  role: string;
  token?: string;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: User;
}
