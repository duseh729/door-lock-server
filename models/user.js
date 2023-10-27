const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(id, password, nickname) {
    this.id = id;
    this.nickname = nickname;
    this.password = password;
    this.doorlockStatus = false;
    this.force = false;
    this.doorlockPassword = null;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne({
      id: this.id,
      password: this.password,
      nickname: this.nickname,
      doorlockStatus: this.doorlockStatus,
      force: this.force,
      doorlockPassword: this.doorlockPassword,
    });
  }

  // 아이디로 data 찾기
  static findById(data) {
    const db = getDb();
    return db.collection("users").findOne({ id: data.userId });
  }

  // 무적 상태 활성화/비활성화
  static updateForceById(data) {
    const db = getDb();

    const { userId, forceData } = { ...data };

    return db.collection("users").updateOne({ id: userId }, { $set: { force: forceData } });
  }

  // 도어락 비밀번호 설정
  static updateDoorlockPasswordById(data) {
    const db = getDb();

    const { userId, doorlockPassword } = { ...data };

    return db.collection("users").updateOne({ id: userId }, { $set: { doorlockPassword: doorlockPassword } });
  }
}

exports.User = User;
