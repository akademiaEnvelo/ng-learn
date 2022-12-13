export interface AuthResponse {
  token: string;
  user: {
    email: string;
    id: number;
  };
}
