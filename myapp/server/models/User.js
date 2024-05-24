const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: [true, "중복되는 닉네임이 존재합니다."],
  },
  password: {
    type: String,
    required: [true, "비밀번호를 입력해 주세요."],
  },
  ticket: {
    type: Number,
    default: 0,
  },
  today_ticket: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
