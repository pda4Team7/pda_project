import React, { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import infoComplete from "~/assets/infoComplete.svg";
import infoCompleteCircle from "~/assets/infoCompleteCircle.svg";
import "./complete.css";
import Loading from "../loading-page/Loading";

const Complete = () => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false); // 이미지 로드 여부 상태 추가

  const gotoWhere = () => {
    navigate("/main");
  };

  return (
    <div className="total-complete">
      <div className="complete">
        <Image
          className="tottaImage"
          src={infoComplete}
          alt="onmysubway_seatInfo_image"
          onLoad={() => setImageLoaded(true)} // 이미지가 로드될 때 이미지 로드 상태 변경
        />
        {imageLoaded ? ( // 이미지가 로드된 경우
          <>
            <div className="firstDiv">
              <p id="firstDivP1">정보를 공유했어요!</p>
              <p id="firstDivP2">
                서서 가는 사람들 중 열람권을 사용한 사람만
                <br />
                나의 좌석 정보를 열람할 수 있게 됩니다.
              </p>
            </div>
            <div className="secondDiv">
              <Image
                src={infoCompleteCircle}
                alt="onmysubway_seatInfo_button_image"
              />
              <p>열람권 획득 + 1</p>
            </div>
            <Button className="button" onClick={gotoWhere}>
              확인
            </Button>
          </>
        ) : (
          // 이미지가 로드되지 않은 경우
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Complete;
