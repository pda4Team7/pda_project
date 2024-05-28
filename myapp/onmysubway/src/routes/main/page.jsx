import React, { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import userimg from "~/assets/user_profile.png";
import "./page.css";
import LineSelect from "~/components/main-page/LineSelect";
import StaionSelect from "~/components/main-page/StaionSelect";

export default function MainPage() {
  // ** 추후 Login 페이지에 user정보를 가져오기!
  const test_user = {
    name: "최진양",
  };
  const user = test_user;

  // ** 추후 7호선 전체 역 이름 정보를 가져오기!
  const test_station_name = ["굴포천", "삼산체육관", "상동", "부천시청"];
  const station_name = test_station_name;

  const [line, setLine] = useState(null);
  const [color, setColor] = useState(null);
  const [depart, setDepart] = useState(null);
  const [arr, setArr] = useState(null);

  return (
    <div className="main-page">
      <nav className="user-navigation-tab">
        <section className="user-profile-group">
          <Image src={userimg} className="user-image" roundedCircle />
          <div>
            <div id="user-nav-name">{user.name} </div>
            <div className="user-nav-text">남은 열람권 수를 확인 해보세요.</div>
          </div>
          <div>
            <Button 
              // as="input"
              type="submit"
              // value={`내 정보\n확인`}              
            >{" "}
            <Link to="/info" id="btn-my-info" style={{ textDecoration: 'none', color: 'inherit' }}>{`내 정보\n확인`}</Link></Button>
          </div>
        </section>
      </nav>
      <nav className="subway-selection">
        <section className="subway-select-group">
          <p id="subway-select-text">내가 탄 열차의 정보를 선택 해주세요.</p>
          <LineSelect setLine={setLine} setColor={setColor} />
          <div className="subway-direction-group">
            <div id="sub-dir-0">출발역 선택</div>
            <div id="sub-dir-1">도착역 선택</div>
          </div>
        </section>
        <section className="subway-destination-select-group">
          {line !== null ? (
            <StaionSelect
              color={color}
              depart={depart}
              setDepart={setDepart}
              arr={arr}
              setArr={setArr}
            />
          ) : null}
        </section>
      </nav>
    </div>
  );
}
