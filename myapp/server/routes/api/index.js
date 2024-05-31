// api 라우터 관리

const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/seatInfo", require("./seatInfo"));

module.exports = router;
