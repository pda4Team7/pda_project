import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import userimg from "~/assets/user_profile.png";
import "./page.css";

export default function MainPage() {
  // ** 추후 Login 페이지에 user정보를 가져오기!
  const test_user = {
    name: "최진양",
  };
  const user = test_user;

  // ** 추후 지하철 2가지 방면 정보를 가져오기!
  const test_right_go = "장암";
  const test_left_go = "석남(거북시장)";
  const subway_direction = [test_left_go, test_right_go];

  // ** 추후 7호선 전체 역 이름 정보를 가져오기!
  const test_station_name = ["굴포천", "삼산체육관", "상동", "부천시청"];
  const station_name = test_station_name;

  // 총 total 호선
  const total_line = [
    { line: 1, color: "#263F93" },
    { line: 2, color: "#41B353" },
    { line: 3, color: "#EF6C1D" },
    { line: 4, color: "#2FA0DB" },
    { line: 5, color: "#883FDB" },
    { line: 6, color: "#B44F19" },
    { line: 7, color: "#697121" },
    { line: 8, color: "#E31F6D" },
    { line: 9, color: "#D1A43C" },
  ];

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
              as="input"
              type="submit"
              value={`내 정보\n확인`}
              id="btn-my-info"
            />{" "}
            <Link to="/"></Link>
          </div>
        </section>
      </nav>
      <nav className="subway-selection">
        <section className="subway-select-group">
          <p id="subway-select-text">내가 탄 열차의 정보를 선택 해주세요.</p>
          <div className="subway-select-number">
            <div className="subway-select-number-row">
              {total_line.map((elem, i) => (
                <div
                  className="subway-line-circle"
                  style={{ backgroundColor: elem.color }}
                >
                  {elem.line}
                </div>
              ))}
            </div>
          </div>
          <div className="subway-direction-group">
            {subway_direction.map((elem, i) => (
              <div id={"sub-dir-" + i} key={"sub-dir-" + i}>
                {elem}
              </div>
            ))}
          </div>
        </section>
        <section className="subway-destination-select-group">
          <div></div>
        </section>
      </nav>
    </div>
  );
}
