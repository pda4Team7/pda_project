import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "~/components/seatInfo-page/seatInfo.css";
import ListGroup from "react-bootstrap/ListGroup";

export default function SeatDetailInfo({ show, handleClose, user }) {
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
  const jsonString = user.seatNum.replace(/(\w+):/g, '"$1":');
  const seatObj = JSON.parse(jsonString);

  const selectedRow = seatObj.row;
  const selectedCol = seatObj.col;

  const renderGrid = () => {
    const rows = 6;
    const cols = 30;
    const grid = [];

    for (let row = 0; row < rows; row++) {
      const rowCells = [];
      for (let col = 0; col < cols; col++) {
        const isSelected = selectedRow === row && selectedCol === col;
        const isClickable = clickableSeats.some(
          (seat) => seat.row === row && seat.col === col
        );
        rowCells.push(
          <div
            key={`${row}-${col}`}
            className={`seat ${isClickable ? "clickable" : ""} ${
              isSelected ? "selected" : ""
            }`}
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
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{user.user.nickname}님 정보</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body">
          <p>
            아래 정보를 참고하여 자리를 선점해 보세요!<br></br>
            자리를 앉지 못할 수도 있습니다.
          </p>
          <div>
            <div className="seat-title">
              {user.user.nickname}님의 좌석 위치
            </div>
            <div className="seat-grid">{renderGrid()}</div>
          </div>
          <ListGroup className="seat-detail-container">
            <ListGroup.Item className="seat-detail-item">
              <span>도착지:</span> {user.endSt}
            </ListGroup.Item>
            <ListGroup.Item className="seat-detail-item">
              <span>신발 착장:</span> {user.clothes}
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
