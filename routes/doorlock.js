const express = require("express");
const router = express.Router();
const cors = require("cors"); // cors 라이브러리 import

const { User } = require("../models/user");

router.use(cors()); // cors 사용
router.use(express.json());

// 무적 상태 활성화/비활성화
router.post("/force", (req, res, next) => {
  const data = { userId: req.body.userId, forceData: req.body.forceData };
  User.updateForceById(data).then(result => {
    res.json({ message: "무적 변경" });
  });
});

// 도어락 비밀번호 설정
router.post("/set-doorlock-password", (req, res, next) => {
  const data = { userId: req.body.userId, doorlockPassword: req.body.doorlockPassword };

  console.log(data);
  if (data.doorlockPassword === undefined || data.doorlockPassword === null) {
    return res.json({ message: "도어락 비밀번호 입력을 안했잖아" });
  }

  User.updateDoorlockPasswordById(data).then(result => {
    res.json({ message: "도어락 비밀번호 설정완료" });
  });
});

// 임시 비밀번호
router.post("/temporary-password", (req, res, next) => {});

// 이용내역
router.get("/usage-history", (req, res, next) => {});
router.post("/usage-history", (req, res, next) => {});

// 도어락 오픈
router.post("/door-open", (req, res, next) => {
  console.log(req.body);

  res.json({ doorlockStatus: req.body.doorlockStatus });
});

module.exports = router;
