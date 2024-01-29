export interface User {
  id: number;
  name: string | null;
  email: string;
  password: string;
}

export type userData = Pick<User, "name" | "email" | "password">;
