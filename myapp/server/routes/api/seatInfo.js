const express = require("express");
const router = express.Router();
const axios = require("axios");

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

// 해당역에 도착하는 열차번호 찾는 함수
async function subway(startSt) {
  var url = `http://swopenapi.seoul.go.kr/api/subway/${process.env.SUBWAY_KEY}/json/realtimeStationArrival/0/5/${startSt}`; /* URL */

  const trainNum = await axios
    .get(url)
    .then((response) => {
      // API 응답에서  추출
      return response.data.realtimeArrivalList[0].btrainNo; // 첫 번째 도착 열차의 열차번호
    })
    .catch((error) => {
      console.error("Error fetching subwayInfo:", error);
      throw error;
    });
  return trainNum;
}

// 정보 추가
router.post("/", async (req, res) => {
  const user = req.body.user;
  const startSt = req.body.startSt;
  const endSt = req.body.endSt;
  const compartment = req.body.compartment;
  const isSeated = req.body.isSeated;
  const clothes = req.body.clothes;
  const seatNum = req.body.seatNum;
  const trainNum = await subway(startSt);

  console.log(user, trainNum);

  // /**
  //  * 테스트를 위한 코드
  //  * 2시간 후 seatInfo 삭제
  //  */
  let d = new Date();
  d.setSeconds(d.getSeconds() + 7200);
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
