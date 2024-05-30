import React, { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./seatInfo.css";
import { fetchCreateSeatInfo } from "../../lib/apis/seatInfo";
import { useLocation } from "react-router-dom";
import backIcon from "../../assets/back-icon.png";

// 출발역, 도착역, 앉았는 지 아닌지 여부를 받아야 함
const SeatInfo = () => {
  const location = useLocation();
  const { user, startSt, endSt, compartment } = location.state || {};

  // 앉은 곳
  const [seatPosition, setSeatPosition] = useState(null);

  // 인상착의
  const [clothes, setClothes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // 클릭 가능한 셀의 좌표 배열
  const clickableSeats = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 4 },
    { row: 0, col: 5 },
    { row: 0, col: 6 },
    { row: 0, col: 7 },
    { row: 0, col: 8 },
    { row: 0, col: 9 },
    { row: 0, col: 12 },
    { row: 0, col: 13 },
    { row: 0, col: 14 },
    { row: 0, col: 15 },
    { row: 0, col: 16 },
    { row: 0, col: 17 },
    { row: 0, col: 20 },
    { row: 0, col: 21 },
    { row: 0, col: 22 },
    { row: 0, col: 23 },
    { row: 0, col: 24 },
    { row: 0, col: 25 },
    { row: 0, col: 28 },
    { row: 0, col: 29 },
    { row: 5, col: 0 },
    { row: 5, col: 1 },
    { row: 5, col: 4 },
    { row: 5, col: 5 },
    { row: 5, col: 6 },
    { row: 5, col: 7 },
    { row: 5, col: 8 },
    { row: 5, col: 9 },
    { row: 5, col: 12 },
    { row: 5, col: 13 },
    { row: 5, col: 14 },
    { row: 5, col: 15 },
    { row: 5, col: 16 },
    { row: 5, col: 17 },
    { row: 5, col: 20 },
    { row: 5, col: 21 },
    { row: 5, col: 22 },
    { row: 5, col: 23 },
    { row: 5, col: 24 },
    { row: 5, col: 25 },
    { row: 5, col: 28 },
    { row: 5, col: 29 },
  ];

  // 그리드 클릭 핸들러
  const handleSeatClick = (row, col) => {
    const isClickable = clickableSeats.some(
      (seat) => seat.row === row && seat.col === col
    );
    if (isClickable) {
      setSeatPosition({ row, col });
    }
  };

  // 그리드 생성
  const renderGrid = () => {
    const rows = 6;
    const cols = 30;
    const grid = [];

    for (let row = 0; row < rows; row++) {
      const rowCells = [];
      for (let col = 0; col < cols; col++) {
        const isSelected =
          seatPosition?.row === row && seatPosition?.col === col;
        const isClickable = clickableSeats.some(
          (seat) => seat.row === row && seat.col === col
        );
        rowCells.push(
          <div
            key={`${row}-${col}`}
            className={`seat ${isClickable ? "clickable" : ""} ${
              isSelected ? "selected" : ""
            }`}
            onClick={() => handleSeatClick(row, col)}
          ></div>
        );
      }
      grid.push(
        <div key={row} className="seat-row">
          {rowCells}
        </div>
      );
    }
    return grid;
  };

  // 정보 등록 핸들러
  const handleSeatInfoRegisterClick = () => {
    const data = {
      user: user,
      startSt: startSt,
      endSt: endSt,
      compartment: compartment,
      isSeated: true,
      clothes: clothes,
      seatNum: seatPosition.row + "-" + seatPosition.col,
    };

    fetchCreateSeatInfo(data)
      .then(() => {
        navigate("/seatInfo/complete");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("좌석 정보 등록에 실패했습니다. 다시 시도해 주세요.");
        alert(errorMessage);
      });
  };

  // 뒤로가기 핸들러
  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <div className="seatInfo">
      <Image onClick={handleBackPage} className="icon" src={backIcon} />
      {/* 출발역 > 도착역 */}
      <div className="directionDiv">
        <p>{`${startSt} > ${endSt}`}</p>
      </div>

      <div className="firstInfoDiv">
        <p>
          내가 내리는 역을 공유하고,
          <br />
          열람권을 획득하세요.
        </p>
      </div>

      <div className="inputDiv">
        <div className="inputDivFirstInfo">
          <p>내 좌석 정보 공유하기</p>
        </div>
        <div className="inputDivSecondInfo">
          <p>
            나의 좌석 위치와 어디 역에서 내리는지 공유해주세요.
            <br />
            서서 가는 사람들에게 소중한 정보가 될 거예요.
          </p>
        </div>

        {/* 라인 */}
        <div className="divLine"></div>

        <div className="inputDivThirdInfo">
          <p>좌석 위치</p>

          {/* 여기서 좌석 데이터를 받을 수 있어야 할듯 */}
          <div className="seat-grid">{renderGrid()}</div>
        </div>

        {/* 도착지 */}
        <span className="inputDivGoal">
          <p>도착지: </p>
          <p id="endSt">{endSt}</p>
        </span>

        {/* 인상착의 */}
        <span className="inputDivInput">
          <p>신발 착장: </p>
          <input
            type="text"
            value={clothes}
            placeholder="파란색 컨버스"
            onChange={(e) => setClothes(e.target.value)}
          />
        </span>

        {/* 예시 문구 */}
        <p className="inputDivExample">
          신발 색깔 혹은 나를 구분할 수 있는 착장 정보를 간단하게 알려주세요.
          (ex. 파란색 컨버스)
        </p>

        {/* 등록 버튼 */}
        <Button id="button" onClick={handleSeatInfoRegisterClick}>
          내 정보 등록하기
        </Button>
      </div>
    </div>
  );
};

export default SeatInfo;
