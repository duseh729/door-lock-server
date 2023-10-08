const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors"); // cors 라이브러리 import
const bodyParser = require("body-parser"); // body-parser 라이브러리 import

const mongoConnect = require("./util/database").mongoConnect; // mongodb 데이터베이스

const port = process.env.PORT || 3000;

const userRoutes = require("./routes/user");
const doorlockRoutes = require("./routes/doorlock");
const raspberryRoutes = require("./routes/raspberry");

app.use(cors()); // cors 사용
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/public"))); // https://despiteallthat.tistory.com/151 <- 블로그 참고

app.use(userRoutes);
app.use(doorlockRoutes);
app.use(raspberryRoutes);

mongoConnect(client => {
  app.listen(3000);
});
