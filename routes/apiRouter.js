const express = require("express");
const router = express.Router();

router.get("/data", (req, res) => {
  // 엔드포인트 로직을 작성합니다.
  // 클라이언트에게 응답을 보냅니다.
  res.json({ message: "This is the data from the server" });
  console.log("Hello World!");
});

module.exports = router;
