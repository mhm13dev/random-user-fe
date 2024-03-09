import { axiosAPI } from "@/utils/axios";
import { User } from "./types";

interface GetUserParams {
  maximumUsers: number;
}

export const getUsers = async (params?: GetUserParams): Promise<User[]> => {
  const response = await axiosAPI.get<{
    results: User[];
  }>("/api", {
    params: {
      results: params?.maximumUsers ?? 1000,
    },
  });

  return response.data.results;
};
