import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const SeatList = () => {
  const seatInfo = [];
  return (
    <div>
      <ListGroup as="ol" numbered>
        <ListGroup.Item as="li" action href="#link1">
          Link 1
        </ListGroup.Item>
        <ListGroup.Item as="li" action href="#link2">
          Link 2
        </ListGroup.Item>
        <ListGroup.Item as="li" action>
          This one is a button
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default SeatList;
