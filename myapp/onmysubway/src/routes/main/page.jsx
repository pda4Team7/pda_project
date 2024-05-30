import React, { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import userimg from "~/assets/user_profile.png";
import icon from "~/assets/subway_icon.png";
import nav from "~/assets/user_nav.svg";
import "./page.css";
import { useSelector } from "react-redux";
import LineSelect from "~/components/main-page/LineSelect";
import StaionSelect from "~/components/main-page/StaionSelect";

export default function MainPage() {
  const user = useSelector((state) => state.user.userName);

  const [line, setLine] = useState(null); // 선택한 호선 (ex. 7호선)
  const [color, setColor] = useState(null); // 선택한 호선의 색
  const [depart, setDepart] = useState(null); // 고객의 출발역
  const [arr, setArr] = useState(null); // 고객의 도착역
  const [userState, setUserState] = useState(null); // 고객의 현재 상태 (서있음 or 앉아있음)
  const [trainNumber, setTrainNumber] = useState(""); // 고객의 현재 칸
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="main-page">
      <nav className="user-navigation-tab">
        <button className="nav-toggle" onClick={toggleNav}>
          <Image src={nav}></Image>
        </button>
        <section className={`user-profile-group ${isOpen ? 'open' : ''}`}>
          <section className="user-profile-group-margin animate__animated animate__fadeIn">
          <Image src={userimg} className="user-image" roundedCircle />
          <div className="user-profile-text">
            <div id="user-nav-name">{user} </div>
            <div className="user-nav-text">남은 열람권 수를 확인 해보세요.</div>
            </div>
          <div>
            <Button
              id="btn-user-info"
              // as="input"
              type="submit"
              // value={`내 정보\n확인`}
            >
              {" "}
              <Link
                to="/info"
                id="btn-my-info"
                style={{ textDecoration: "none", color: "inherit" }}
              >{`내 정보\n확인`}</Link>
            </Button>
          </div>
          </section>
        </section>
      </nav>
      <nav className="subway-selection">
        <section className="subway-select-group">
          <div className="subway-text-group">
          <Image id="subway-icon" src={icon}></Image>
          <h3 id="subway-big-text">어디로 가시나요?</h3>
          </div>
          <p id="subway-select-text">내가 탄 열차의 정보를 선택 해주세요.</p>
          
          <LineSelect setLine={setLine} setColor={setColor} />
          <div className="subway-direction-group">
            <div id="sub-dir-0">출발역</div>
            <div id="sub-dir-1">도착역</div>
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
              trainNumber={trainNumber}
              setTrainNumber={setTrainNumber}
              userState={userState}
              setUserState={setUserState}
            />
          ) : null}
        </section>
      </nav>
    </div>
  );
}
