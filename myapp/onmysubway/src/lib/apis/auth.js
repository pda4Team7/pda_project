
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
    try {
        const resp = await service.post("/signup", {
            nickname: nickname,
            password: password,
          });
          return resp.data;
    } catch(err){
        return false;
    }
  
 
}

// 유저 정보 요청
export async function serverUserInfo(){
    try {
        const resp = await service.get('/detail', {
            withCredentials: true
          });
        console.log(resp.data)
        return resp.data;
    } catch(err) {
        return false;
    }
    
}

// 로그아웃
export async function serverLogout(){
    try{
    const resp = await service.post('/logout', {
        withCredentials: true
    });
    console.log(resp.data);
    return resp.data;
    } catch(err){
        return false;
    }
   
}
