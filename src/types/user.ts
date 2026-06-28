export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};

export type UsersResponse = {
  users: User[];
};