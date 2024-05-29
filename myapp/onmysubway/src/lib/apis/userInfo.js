import axios from "axios";

const BASE_URL = "/api/seatInfo";
const service = axios.create({
  baseURL: BASE_URL,
});

// 로그인 요청
export async function postUserInfo({
  user,
  depart,
  arr,
  trainNumber,
  isSeated,
  clothes,
  seatNum,
}){
  const resp = await service.post("/", {
    user: user,
    startSt: depart,
    endSt: arr,
    compartment: trainNumber,
    isSeated: isSeated,
    clothes: clothes,
    seatNum: seatNum,
  });
  return resp.data;
}
