import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { UsersResponse } from "@/types/user";
import { apiClient } from "#/api/apiClient";

const fetchUsers = async (page: number): Promise<UsersResponse> => {
  const limit = 10;
  const skip = (page - 1) * limit;

  const response = await apiClient.get<UsersResponse>("/users", {
    params: {
      limit,
      skip,
    },
  });
  return response.data;
};

export const useUsers = (page: number) => {
  return useQuery<UsersResponse, Error>({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page),
    placeholderData: keepPreviousData,
    meta: {
      errorMessage:"Failed to fetch users list."
    }
  });
};
