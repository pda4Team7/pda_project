const express = require("express");
const router = express.Router();

const User = require("../../models/User");

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

router.post("/", (req, res) => {
  User.create(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
