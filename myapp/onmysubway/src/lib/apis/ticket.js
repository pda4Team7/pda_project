import axios from "axios";

const BASE_URL = "/api/user/ticket";
const service = axios.create({
  baseURL: BASE_URL,
});

export async function useTicket() {
  const resp = await service.get("/");
  console.log(resp.data);
  console.log("소진 완료");
  return resp.data;
}
