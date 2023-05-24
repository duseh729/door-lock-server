const express = require("express");
const cors = require("cors");

const app = express();

const apiRouter = require("./routes/apiRouter");

// 모든 출처에서의 요청 허용
app.use(cors());
app.use("/api", apiRouter);

// 또는 특정 출처에서의 요청만 허용
app.use(
  cors({
    origin: ["http://localhost:19006", "http://localhost:19000"], // 허용할 출처 주소
  })
);

// 나머지 익스프레스 앱 설정 및 라우터 등 추가

app.listen(3000, () => {
  console.log("서버가 3000번 포트에서 실행 중입니다.");
});

app.get("/", function (req, res) {
  res.send("안녕하세요!");
  console.log("Hello World!");
});
