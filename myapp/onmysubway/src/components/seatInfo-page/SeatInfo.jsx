import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 출발역, 도착역, 앉았는 지 아닌지 여부를 받아야 함
const SeatInfo = () => {
  // 앉은 곳
  const [seatPosition, setSeatPosition] = useState();

  // 인상착의
  const [clothes, setClothes] = useState("");

  const navigate = useNavigate();

  return (
    <div>
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
          <div>{/* 표 */}</div>
        </div>
      </div>
    </div>
  );
};

export default SeatInfo;
