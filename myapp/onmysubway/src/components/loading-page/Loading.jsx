import React from "react";
import Spinner1 from "../../assets/spinner1.gif";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="main-container">
      <h3>잠시만 기다려주세요.</h3>
      <img src={Spinner1} alt="로딩" width="10%"></img>
    </div>
  );
}
