import axios from "axios";

const BASE_URL = "/api/user";
const service = axios.create({
  baseURL: BASE_URL,
});

// 로그인 요청
export async function serverLogin({ nickname, password }) {
  try {
    const resp = await service.post("/signin", {
      nickname: nickname,
      password: password,
    });
    return resp.data;
  } catch (error) {
    return false;
  }
}

// 회원가입 요청
export async function serverSignUp({ nickname, password }) {
  try {
    const resp = await service.post("/signup", {
      nickname: nickname,
      password: password,
    });
    return [true, resp.data];
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      return err.response.data.message; // 서버가 제공하는 에러 메시지 리턴
    } else {
      return [false, err.message]; // 기본 에러 메시지 리턴
    }
  }
}

// 유저 정보 요청
export async function serverUserInfo() {
  try {
    const resp = await service.get("/detail", {
      withCredentials: true,
    });
    console.log(resp.data);
    return resp.data;
  } catch (err) {
    return false;
  }
}

// 로그아웃
export async function serverLogout() {
  try {
    const resp = await service.post("/logout", {
      withCredentials: true,
    });
    console.log(resp.data);
    return resp.data;
  } catch (err) {
    return false;
  }
}

// 열람권 +1
export async function serverPlusTicket() {
  try {
    const resp = await service.put("/ticket", {
      withCredentials: true,
    });

    console.log(`열람권 + 1: ${resp.data}`);

    return resp.data;
  } catch (error) {
    return false;
  }
}

// 현재 비밀번호 체크
export async function serverCheckPassword({ saltPassword, password }) {
  try {
    const resp = await service.post("/check", {
      saltPassword: saltPassword,
      password: password,
    });

    console.log(`현재 비번: ${resp.data.isCorrect}`);

    return resp.data.isCorrect;
  } catch (error) {
    return false;
  }
}
