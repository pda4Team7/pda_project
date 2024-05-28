import React from 'react';
import { Image } from 'react-bootstrap';
import userimg from "~/assets/user_profile.png";


const MyInfo = () => {    
    return (
        <div className='info-box'>
            <Image src={userimg}></Image>
            <p></p>
        </div>
    );
};

export default MyInfo;