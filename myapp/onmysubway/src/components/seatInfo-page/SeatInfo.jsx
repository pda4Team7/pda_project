import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./seatInfo.css";
import { fetchCreateSeatInfo } from "../../lib/apis/seatInfo";

// 출발역, 도착역, 앉았는 지 아닌지 여부를 받아야 함
const SeatInfo = () => {
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

  const handleSeatInfoRegisterClick = () => {
    const data = {
      // user: ,
      // startSt: ,
      // endSt: ,
      // compartment: ,
      // isSeated: ,
      clothes: clothes,
      seatNum: seatPosition,
    };

    fetchCreateSeatInfo(data)
      .then(() => {
        navigate("complete");
      })
      .catch((error) => {
        setErrorMessage("좌석 정보 등록에 실패했습니다. 다시 시도해 주세요.");
        console.error(error);
      });
  };

  return (
    <div className="seatInfo">
      {/* 출발역 > 도착역 */}
      <div></div>

      <div>
        <p>
          내가 내리는 역을 공유하고,
          <br />
          열람권을 획득하세요.
        </p>
      </div>

      <div>
        <div>
          <p>내 좌석 정보 공유하기</p>
        </div>
        <div>
          <p>
            나의 좌석 위치와 어디 역에서 내리는지 공유해주세요.
            <br />
            서서 가는 사람들에게 소중한 정보가 될 거예요.
          </p>
        </div>
        <div>
          <p>좌석 위치</p>

          {/* 여기서 좌석 데이터를 받을 수 있어야 할듯 */}
          <div className="seat-grid">{renderGrid()}</div>
        </div>

        {/* 도착지 */}
        <div>
          <p className="textContent">
            <a>도착지: </a>
            <a>{}</a>
          </p>
        </div>

        {/* 인상착의 */}
        <div className="textContent">
          <p>신발 착장: </p>
          <input
            type="text"
            value={clothes}
            onChange={(e) => setClothes(e.target.value)}
          />
        </div>

        {/* 예시 문구 */}
        <p>
          신발 색깔 혹은 나를 구분할 수 있는 착장 정보를 간단하게 알려주세요.
          (ex. 파란색 컨버스)
        </p>

        {/* 등록 버튼 */}
        <Button onClick={handleSeatInfoRegisterClick}>내 정보 등록하기</Button>
      </div>
    </div>
  );
};

export default SeatInfo;
