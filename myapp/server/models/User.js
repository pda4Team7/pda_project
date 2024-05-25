const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // 유저 아이디
  nickname: {
    type: String,
    required: true,
    unique: [true, "중복되는 닉네임이 존재합니다."],
  },
  // 비밀번호
  password: {
    type: String,
    required: [true, "비밀번호를 입력해 주세요."],
  },
  // 열람권
  ticket: {
    type: Number,
    default: 0,
  },
  // 열람권 사용 여부
  today_ticket: {
    type: Boolean,
    default: false,
  },
});

// DB에 user 컬렉션 생성
const User = mongoose.model("user", userSchema);

module.exports = User;
