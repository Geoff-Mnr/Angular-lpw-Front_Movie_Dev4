export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  role: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  is_active: string;
  role_name: string;
  created_by: string;
  nbMovies: number;
}
