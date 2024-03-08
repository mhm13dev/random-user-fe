import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: "https://randomuser.me",
  params: {
    seed: "kuwanso",
  },
});
