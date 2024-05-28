import React from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import infoComplete from "~/assets/infoComplete.svg";
import infoCompleteCircle from "~/assets/infoCompleteCircle.svg";

const Complete = () => {
  const navigate = useNavigate();
  // 어디로 가야함?
  const gotoWhere = () => {
    navigate("/????");
  };

  return (
    <div>
      <Image src={infoComplete} alt="onmysubway_seatInfo_image" />
      <div>
        <h2>정보를 공유했어요!</h2>
        <p>
          서서 가는 사람들 중 열람권을 사용한 사람만
          <br />
          나의 좌석 정보를 열람할 수 있게 됩니다.
        </p>
      </div>
      <div>
        <Image
          src={infoCompleteCircle}
          alt="onmysubway_seatInfo_button_image"
        />
        <p>열람권 획득 + 1</p>
      </div>
      <Button onClick={gotoWhere}>확인</Button>
    </div>
  );
};

export default Complete;
