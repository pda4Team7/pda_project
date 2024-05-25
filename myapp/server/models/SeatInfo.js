const mongoose = require("mongoose");

const seatInfoSchema = new mongoose.Schema({
  // 사용자의 ObjectId 값
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "사용자 ID 값이 없습니다."],
    ref: "User",
  },
  // 출발역
  startSt: {
    type: String,
    required: true,
  },
  // 도착역
  endSt: {
    type: String,
    required: true,
  },
  // 열차 번호
  trainNum: {
    type: String,
    required: true,
  },
  // 칸 번호
  compartment: {
    type: String,
    required: true,
  },
  // 착석 여부
  isSeated: {
    type: Boolean,
    required: true,
  },
  // 인상착의
  clothes: {
    type: String,
  },
  // 좌석 번호
  seatNum: {
    type: String,
    required: true,
  },
  // 생성된 시간, TTL(Time-To-Live) 인덱스 적용
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expire: "20s" },
  },
});

const SeatInfo = mongoose.model("SeatInfo", seatInfoSchema);

module.exports = SeatInfo;
