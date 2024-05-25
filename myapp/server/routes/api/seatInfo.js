const express = require("express");
const router = express.Router();

const SeatInfo = require("../../models/SeatInfo");

// 전체 정보 조회
router.get("/", (req, res) => {
  SeatInfo.find()
    .then((info) => {
      if (info.length === 0) {
        res.json({ message: "비어 있음." });
      } else {
        res.json(info);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ err: "Internal Server Error" });
    });
});

// 정보 추가
router.post("/", (req, res) => {
  const user = req.body.user;
  const startSt = req.body.startSt;
  const endSt = req.body.endSt;
  const trainNum = req.body.trainNum;
  const compartment = req.body.compartment;
  const isSeated = req.body.isSeated;
  const clothes = req.body.clothes;
  const seatNum = req.body.seatNum;

  /**
   * 테스트를 위한 코드
   * 10초 후 삭제 의미
   */
  let d = new Date();
  d.setSeconds(d.getSeconds() + 10);
  const r = new Date(d);

  SeatInfo.create({
    user,
    startSt,
    endSt,
    trainNum,
    compartment,
    isSeated,
    clothes,
    seatNum,
    expireAt: r,
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
});

module.exports = router;
