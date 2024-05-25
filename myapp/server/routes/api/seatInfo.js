const express = require("express");
const router = express.Router();

const SeatInfo = require("../../models/SeatInfo");

// 전체 정보 조회
router.get("/", (req, res) => {
  SeatInfo.find()
    .then((info) => {
      if (info.length === 0) {
        res.status(204).json({ message: "비어 있음." });
      } else {
        res.json(info);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ err: "Internal Server Error" });
    });
});

module.exports = router;
