export interface AuthResponse {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}
