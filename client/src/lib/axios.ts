import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
});

type BodyType = {
  location: string;
  joinerId: string;
  userId: string;
};

type ResponseType = {
  userFullName: string;
  name: string;
  location: string;
};

export async function getLinkData(body: BodyType) {
  const { data } = await axiosClient.post<ResponseType>("/link", body);

  return data;
}
