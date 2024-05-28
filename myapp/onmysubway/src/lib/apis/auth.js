import axios from 'axios';

const BASE_URL = "http://localhost:3000/api/user";
const service = axios.create({
    baseURL: BASE_URL
})

/**
 * 서버에 로그인 요청
 */
export async function serverLogin({nickname, password}){
    console.log({nickname,password})
    const resp = await service.post('/signin',{
        nickname: nickname,
        password: password
    });
    return resp.data;
}