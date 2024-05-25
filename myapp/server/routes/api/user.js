const express = require("express");
const router = express.Router();

const User = require("../../models/User");

router.get("/", async (req, res) => {
  User.find()
    .then((userList) => {
      if (userList.length === 0) {
        // userList가 비어있는지 확인
        // 204는 'No Content'를 의미
        res.status(204).json({ message: "비어 있음." }); // 204 No Content
      } else {
        res.json(userList); // 유저 목록 반환
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" }); // 서버 에러 처리
    });
});

module.exports = router;
