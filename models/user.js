const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(id, password, nickname) {
    this.id = id;
    this.nickname = nickname;
    this.password = password;
    this.force = false;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne({
      id: this.id,
      password: this.password,
      nickname: this.nickname,
      force: this.force,
    });
  }

  static findById(data) {
    const db = getDb();
    return db.collection("users").findOne({ id: data.userId });
  }

  static updataForceById(data) {
    const db = getDb();
    return db.collection("users").updateOne({ id: data.userId }, { $set: { force: data.forceData } });
  }
}

exports.User = User;
