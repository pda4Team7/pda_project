import React from "react";
import SeatInfo from "~/components/seatInfo-page/SeatInfo";

/**
 * 여기서 사용자의 좌석 정보랑
 * 인상착의를 받기 전에
 *
 * 이 사람이 앉았는지,
 * 출발역, 도착역의 정보들을 받아줘야함
 */

export default function SeatInfoPage() {
  return (
    <div>
      <SeatInfo />
    </div>
  );
}
