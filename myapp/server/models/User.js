const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    default: 5,
  },
  // 열람권 사용 여부
  today_ticket: {
    type: Boolean,
    default: false,
  },
});

// 회원가입
userSchema.statics.signUp = async function (nickname, password) {
  // 비밀번호 암호화
  const salt = await bcrypt.genSalt();

  try {
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await this.create({ nickname, password: hashPassword });

    return {
      _id: user._id,
      nickname: user.nickname,
    };
  } catch (error) {
    throw error;
  }
};

// 로그인
userSchema.statics.signIn = async function (nickname, password) {
  const user = await this.findOne({ nickname });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user.visibleUser;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const visibleUser = userSchema.virtual("visibleUser");
visibleUser.get(function () {
  return {
    _id: this._id,
    nickname: this.nickname,
    ticket: this.ticket,
    today_ticket: this.today_ticket,
  };
});

// DB에 user 컬렉션 생성
const User = mongoose.model("user", userSchema);

module.exports = User;
