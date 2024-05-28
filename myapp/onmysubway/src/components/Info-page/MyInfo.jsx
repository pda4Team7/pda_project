import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import userimg from "~/assets/user_profile.png";
import { serverUserInfo } from '~/lib/apis/auth';

const MyInfo = () => {    
    const [user,setUser] = useState();
    useEffect(() => {
        try {
            serverUserInfo().then((data)=>{
                setUser(data);
            })
        } catch (error) {
            console.log(error)
        }    
    }, [])
    console.log(user.nickname)



    return (
        <div className='info-box'>
            <Image src={userimg}></Image>
            <p>{user.nickname}</p>
        </div>
    );
};

export default MyInfo;