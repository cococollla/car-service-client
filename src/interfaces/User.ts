export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  roleName: string;
}

//Модель для отравки данных авторизации поль-ля
export interface UserAuth {
  email: string;
  password: string;
}

export interface ResponseAuth {
  userId: string;
  role: string;
  accessToken: string;
}

export type userData = Pick<User, "name" | "email" | "password">;
