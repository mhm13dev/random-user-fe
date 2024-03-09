import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: "https://randomuser.me",
  params: {
    seed: "kuwanso", // I used this seed to get the same users every time
  },
});
