import { axiosAPI } from "@/utils/axios";

interface GetUserParams {
  maximumUsers: number;
}

export const getUsers = async (params?: GetUserParams) => {
  const response = await axiosAPI.get("/api", {
    params: {
      results: params?.maximumUsers ?? 1000,
    },
  });

  return response.data.results;
};
