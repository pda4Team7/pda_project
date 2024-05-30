import axios from "axios";

const BASE_URL = "/api/user/ticket";
const service = axios.create({
  baseURL: BASE_URL,
});

export async function useTicket() {
  const resp = await service.get("/");
  return resp.data;
}
