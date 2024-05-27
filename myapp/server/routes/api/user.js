const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const User = require("../../models/User");
const {
  createToken,
  verifyToken,
  authenticate,
  signInRequired,
} = require("../../utils/auth");

// 유저 전체 조회
router.get("/", (req, res) => {
  User.find()
    .then((userList) => {
      if (userList.length === 0) {
        // userList가 비어있는지 확인
        // 204는 'No Content'를 의미
        res.json({ message: "비어 있음." });
      } else {
        res.json(userList); // 유저 목록 반환
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" }); // 서버 에러 처리
    });
});

// 유저 상세 조회
router.get("/detail", authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "유저 조회가 안됨" });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// 회원 가입
router.post("/signup", async (req, res, next) => {
  try {
    const { nickname, password } = req.body;
    const user = await User.signUp(nickname, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

// 로그인
router.post("/signin", async (req, res, next) => {
  try {
    const { nickname, password } = req.body;
    const user = await User.signIn(nickname, password);

    const tokenMaxAge = 60 * 60 * 24 * 3;
    const token = createToken(user, tokenMaxAge);

    user.token = token;

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: tokenMaxAge * 1000,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(err);
    // res.status(400).json({ error: "Invalid credentials" });
    res.status(400);
    next(err);
  }
});

// 로그아웃
router.all("/logout", async (req, res, next) => {
  try {
    res.cookie("authToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400);
    next(err);
  }
});

// 정보 수정 (닉네임)
router.put("/nickname", authenticate, async (req, res, next) => {
  try {
    const user = req.user;

    const update = { nickname: req.body.nickname };

    // new: true 옵션은 업데이트 후의 문서 반환을 의미
    const updatedUser = await User.findByIdAndUpdate(user._id, update, {
      new: true,
    });

    if (!updatedUser) {
      // 사용자가 존재하지 않는 경우
      return res.status(404).json({ error: "User not found." });
    }

    // 업데이트된 사용자 응답
    res.json({ message: "업데이트 성공", nickname: updatedUser.nickname });
  } catch (error) {
    next(error);
  }
});

// 정보 수정 (비밀번호)
router.put("/pwd", authenticate, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "입력되지 않은 필드가 있음" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "유저 조회가 안됨" });
    }

    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ error: "현재 비밀번호와 입력하신 비밀번호가 불일치합니당" });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ error: "현재 비번과 변경할 비번이 같아" });
    }

    const salt = await bcrypt.genSalt();

    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "비밀번호가 변경되었습니다!" });
  } catch (error) {
    next(error);
  }
});

// 열람권 사용
router.get("/ticket", authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "유저 조회가 안됨" });
    }

    const userTicketNum = user.ticket;
    console.log(userTicketNum);
    if (userTicketNum < 1) {
      return res.status(400).json({ message: "열람권이 없습니다!" });
    }

    user.ticket -= 1;
    user.today_ticket = true;

    await user.save();

    res.status(200).json({
      message: "열람권 사용 성공",
      leftTickets: user.ticket,
      today_ticket: user.today_ticket,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
