import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const sendJoinRequest = async (adder: string, joinId: string) => {
  const url = adder === "c" ? `/join/core` : `/join/nexus`;

  return await axiosClient.get(url, {
    params: {
      id: joinId,
    },
  });
};
