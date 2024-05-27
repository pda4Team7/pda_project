
import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import ddota from "./ddota.jpeg";
import "./main.css";

export default function MainPage() {
  const user = {
    name: "최진양",
  };
  return (
    <Container className="justify-content-md-center">
      <Row>
        <Col xs={3}>
          <Image src={ddota} className="img-fluid" roundedCircle />
        </Col>
        <Col xs={9} className="d-flex flex flex-row align-items-center">
          <div>
            <div>{user.name} </div>
            <div className="font">남은 열람권 수를 확인 해보세요.</div>
          </div>
          <div>
            <Button as="input" type="submit" value="Submit" />{" "}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
