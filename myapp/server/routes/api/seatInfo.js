const express = require("express");
const router = express.Router();
const axios = require("axios");
const {
  createToken,
  verifyToken,
  authenticate,
  signInRequired,
} = require("../../utils/auth");

const subway = require("../../utils/subway7");

const SeatInfo = require("../../models/SeatInfo");
const User = require("../../models/User");

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
async function findSubway(startSt) {
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
router.post("/", authenticate, async (req, res) => {
  const user = req.body.user;
  const startSt = req.body.startSt;
  const endSt = req.body.endSt;
  const compartment = req.body.compartment;
  const isSeated = req.body.isSeated;
  const clothes = req.body.clothes;
  const seatNum = req.body.seatNum;
  const trainNum = await findSubway(startSt);
  const direction = subway["subway7"][startSt] - subway["subway7"][endSt]; //유저가 가는 지하철 방면 (+: 장암행, -: 부평구청행)

  // /**
  //  * 테스트를 위한 코드
  //  * 2시간 후 seatInfo 삭제
  //  */
  let d = new Date();
  d.setSeconds(d.getSeconds() + 7200);
  const r = new Date(d);

  if (isSeated) {
    // 앉아 있을 경우 열람권 +1
    const newTicket = req.user.ticket;
    User.findByIdAndUpdate(req.user._id, {
      ticket: newTicket + 1,
    }).then((e) => console.log(e));
  }

  SeatInfo.create({
    user,
    startSt,
    endSt,
    direction,
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

// 좌석 리스트 정보 조회
router.get("/seatList", authenticate, (req, res) => {
  SeatInfo.find()
    .populate({
      path: "user",
      select: "nickname",
    })
    .then((info) => {
      if (info.length === 0) {
        res.json({ message: "비어 있음." });
      } else {
        SeatInfo.find({ user: req.user._id }).then((result) => {
          const userSeat = result[result.length - 1]; // 유저의 가장 최근 지하철 탑승 정보
          if (userSeat) {
            const trainAndCompart = info.filter(
              // 같은 열차와 칸에 앉아 있는 사람들 리스트
              (data) =>
                data.trainNum === userSeat.trainNum &&
                data.compartment === userSeat.compartment &&
                data.isSeated
            );

            // console.log(userSeat);

            // 유저보다 먼저 일어날 확률이 있는 사람들의 리스트
            var userSeatList = trainAndCompart.filter(
              (data) =>
                userSeat.user != data.user &&
                ((userSeat.direction > 0 &&
                  data.direction > 0 &&
                  subway["subway7"][data.endSt] >
                    subway["subway7"][userSeat.endSt]) ||
                  (userSeat.direction < 0 &&
                    data.direction < 0 &&
                    subway["subway7"][data.endSt] <
                      subway["subway7"][userSeat.endSt]))
            );
            console.log(userSeatList);
            res.json(userSeatList);
          } else {
            res.json({ message: "비어 있음." });
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ err: "Internal Server Error" });
    });
});

module.exports = router;
