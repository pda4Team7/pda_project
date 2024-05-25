// api 라우터 관리

const router = require("express").Router();

router.use("/user", require("./user"));

module.exports = router;
