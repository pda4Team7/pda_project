import axios from 'axios';

const BASE_URL = "http://localhost:3000/api/user";
const service = axios.create({
    baseURL: BASE_URL
})

// 로그인 요청
export async function serverLogin({nickname, password}){
    try{
    // console.log({nickname,password})
    const resp = await service.post('/signin',{
        nickname: nickname,
        password: password
    });

    return resp.data;

    } catch(error) {
    console.log("login실패")
    throw error;
    }    
}

// 회원가입 요청
export async function serverSignUp({nickname, password}){
    console.log({nickname,password})
    const resp = await service.post('/signup',{
        nickname: nickname,
        password: password
    });
    return resp.data;
}