const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors"); // cors 라이브러리 import
const bodyParser = require("body-parser"); // body-parser 라이브러리 import

const mongoConnect = require("./util/database").mongoConnect; // mongodb 데이터베이스

const port = process.env.PORT || 3000;

const userRoutes = require("./routes/user");
const doorlockRoutes = require("./routes/doorlock");
const raspberryRoutes = require("./routes/raspberry");

app.use(cors({ origin: "http:localhost:3000", credentials: true })); // cors 사용
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(doorlockRoutes);
app.use(raspberryRoutes);

server.listen(port, () => {
  console.log(`${port}번 포트에서 연결중~`);
});

mongoConnect(client => {});

const ws = require("ws");
const wsServer = new ws.Server({ server: server });

wsServer.on("connection", (ws, request) => {
  const ip = request.headers["x-forwarded-for"] || request.connection.remoteAddress;

  console.log(`새로운 클라이언트[${ip}] 접속`);

  if (ws.readyState === ws.OPEN) {
    // 연결 여부 체크
    ws.send(`클라이언트[${ip}] 접속을 환영합니다 from 서버`); // 데이터 전송
  }

  // 3) 클라이언트로부터 메시지 수신 이벤트 처리
  ws.on("message", msg => {
    console.log(`클라이언트[${ip}]에게 수신한 메시지 : ${msg}`);
    ws.send(`메시지 ${msg} 잘 받았습니다! from 서버`);
  });

  // 4) 에러 처러
  ws.on("error", error => {
    console.log(`클라이언트[${ip}] 연결 에러발생 : ${error}`);
  });

  // 5) 연결 종료 이벤트 처리
  ws.on("close", () => {
    console.log(`클라이언트[${ip}] 웹소켓 연결 종료`);
  });
});
