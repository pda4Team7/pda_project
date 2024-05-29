import axios from "axios";

const BASE_URL = "/api/user";
const service = axios.create({
  baseURL: BASE_URL,
});

// 로그인 요청
export async function serverLogin({nickname, password}){
    try {
        const resp = await service.post('/signin',{
        nickname: nickname,
        password: password
    });
    return resp.data;

    } catch(error) {
        return false;
    }
    
}

// 회원가입 요청
export async function serverSignUp({ nickname, password }) {
  // console.log({nickname,password})
  const resp = await service.post("/signup", {
    nickname: nickname,
    password: password,
  });
  return resp.data;
}

// 유저 정보 요청
export async function serverUserInfo() {
  const resp = await service.get("/detail");
  return resp;
}
