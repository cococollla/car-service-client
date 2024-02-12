export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  roleName: string;
}

export type userData = Pick<User, "name" | "email" | "password">;
