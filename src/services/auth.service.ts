import { apiClient } from "@/api/apiClient";
import type { LoginFormData, SignUpFormData } from "@/schemas/auth.schema";
import type { UsersResponse, User, LoginResponse } from "@/types/user";

export async function login(data: LoginFormData): Promise<LoginResponse> {
  const res = await apiClient.post<LoginResponse>("/auth/login", data);
  return res.data;
}

export async function registerUser(data: SignUpFormData): Promise<User> {
  const res = await apiClient.post<User>("/users/add", data);
  return res.data;
}

export const checkUserExist = async (username: string): Promise<boolean> => {
  const res = await apiClient.get(`/users/search?q=${username}`);
  return res.data.users.length > 0;
};

export async function getUsers(): Promise<UsersResponse> {
  const res = await apiClient.get<UsersResponse>("/users");
  return res.data;
}
