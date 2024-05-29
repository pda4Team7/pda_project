import React from 'react';
import MyInfo from "~/components/Info-page/MyInfo"
import "./page.css"

const page = () => {
    return (
        <div className='info-page'>
            <MyInfo/>
        </div>
    );
};

export default page;