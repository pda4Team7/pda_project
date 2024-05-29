import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import FormGroup from "react-bootstrap/FormGroup";
import trainImg from "~/assets/train_number_image.png";

// 컴포넌트 이름: UserInfo
// 컴포넌트 역할: 고객 모달창, 고객이 현재 있는 칸과 서있는/앉아있는 정보를 받아 넘기는 역할
// css 파일: routes > page.css
export default function UserInfo({
  show,
  handleClose,
  handleSubmit,
  trainNumber,
  setTrainNumber,
  userState,
  setUserState,
}) {
  const handleRadioChange = (event) => {
    setUserState(event.target.id);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>추가 정보를 입력해주세요</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup as={Col} className="mb-3 train-number">
            <Form.Label>칸 번호</Form.Label>
            <Form.Control
              className="number-input"
              required
              type="text"
              placeholder="여기에 칸 번호를 입력하세요"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
            />
            <div>
              칸 번호는 열차와 열차 사이의 출입문 위 혹은 출입문에서 확인할 수
              있습니다.
            </div>
            <Image src={trainImg} alt="onmysubway_train_number_ex_img" />
          </FormGroup>
          <Form className="user-state">
            <div key="inline-radio" className="mb-3">
              <Form.Check
                inline
                name="group1"
                type="radio"
                id="stand-state"
                onChange={handleRadioChange}
                className={userState === "stand-state" ? "selected" : ""}
              >
                <Form.Check.Input
                  type="radio"
                  name="group1"
                  id="stand-state"
                  checked={userState === "stand-state"}
                  onChange={handleRadioChange}
                />
                <Form.Check.Label htmlFor="stand-state">
                  <div className="user-state-item">
                    <div>지금 서 있어요</div>
                    <p>열람권을 사용해 좌석정보를 알 수 있어요!</p>
                  </div>
                </Form.Check.Label>
              </Form.Check>
              <Form.Check
                inline
                name="group1"
                type="radio"
                id="sit-state"
                onChange={handleRadioChange}
                className={userState === "sit-state" ? "selected" : ""}
              >
                <Form.Check.Input
                  type="radio"
                  name="group1"
                  id="sit-state"
                  checked={userState === "sit-state"}
                  onChange={handleRadioChange}
                />
                <Form.Check.Label htmlFor="sit-state">
                  <div className="user-state-item">
                    <div>지금 앉아있어요</div>
                    <p>본인의 정보를 남기고 열람권 1개를 획득하세요!</p>
                  </div>
                </Form.Check.Label>
              </Form.Check>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
