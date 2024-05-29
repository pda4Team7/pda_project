import axios from "axios";

const BASE_URL = "/api/seatInfo";
const service = axios.create({
  baseURL: BASE_URL,
});

// 로그인 요청
export async function postUserInfo({
  user,
  startSt,
  endSt,
  compartment,
  isSeated,
  clothes,
  seatNum,
}) {
  const resp = await service.post("/", {
    user: user,
    startSt: startSt,
    endSt: endSt,
    compartment: compartment,
    isSeated: isSeated,
    clothes: clothes,
    seatNum: seatNum,
  });
  return resp.data;
}
