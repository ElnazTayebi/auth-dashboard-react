import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { UsersResponse } from "@/types/user";

const fetchUsers = async (page: number): Promise<UsersResponse> => {
  const limit = 10;
  const skip = (page - 1) * limit;
  
  const response = await fetch(
    `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
  );
  
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  
  return response.json();
};


export const useUsers = (page: number) => {
  return useQuery<UsersResponse>({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page),
    placeholderData: keepPreviousData,
  });
};