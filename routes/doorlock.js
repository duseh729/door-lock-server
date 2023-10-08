const express = require("express");
const router = express.Router();
const cors = require("cors"); // cors 라이브러리 import

const { User } = require("../models/user");

router.use(cors()); // cors 사용
router.use(express.json());

router.post("/force", (req, res, next) => {
  const data = { userId: req.body.userId, forceData: req.body.forceData };
  User.updataForceById(data).then(result => {
    res.json({ message: "무적 변경" });
  });
});

router.post("/temporary-password", (req, res, next) => {});

module.exports = router;
