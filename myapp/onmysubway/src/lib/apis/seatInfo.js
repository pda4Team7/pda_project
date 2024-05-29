import axios from "axios";

const BASE_URL = "/api/seatInfo";

const service = axios.create({
  baseURL: BASE_URL,
});

// 전체 SeatInfo 정보 조회
export async function fetchSeatInfoAllList() {
  const resp = await service.get("/");
  return resp.data;
}

// 좌석 정보 추가
// 추가가 성공하면 자동적으로 열람권 + 1이 되도록 서버에서 설정해 놓았음!
export async function fetchCreateSeatInfo({
  user,
  startSt,
  endSt,
  compartment,
  isSeated,
  clothes,
  seatNum,
  trainNum,
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

// 좌석 리스트 정보 조회
export async function fetchSeatInfoList() {
  const resp = await service.get("/seatList");
  return resp.data;
}
