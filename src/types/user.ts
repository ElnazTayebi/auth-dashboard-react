export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};

export type UsersResponse = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

export type LoginResponse = User & {
  gender: string;
  image: string;
  accessToken: string;
}