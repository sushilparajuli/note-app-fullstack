// shared typescript type definations for all microservices

export interface User {
  id: string;
  email: string;
  createAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}
