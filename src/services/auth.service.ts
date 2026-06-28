
import type { LoginFormData, SignUpFormData } from "@/schemas/auth.shema";
import type { UsersResponse } from "@/types/user";
export async function login(data: LoginFormData) {
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Invalid credentials");

  return res.json();
}

export async function registerUser(data: SignUpFormData) {
  const res = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Register failed");

  return res.json();
}

export const checkUserExist = async (username: string) => {
  const res = await fetch(`https://dummyjson.com/users/search?q=${username}`);
  const data = await res.json();
  return data.users.length > 0;
};

export async function getUsers():Promise<UsersResponse> {
  const res = await fetch("https://dummyjson.com/users");
  if (!res.ok) throw new Error("Failed to fetch users");

  return res.json();
}
