const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(id, password) {
    this.id = id;
    this.password = password;
    this.force = false;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne({
      id: this.id,
      password: this.password,
      force: this.force,
    });
  }

  static findById(data) {
    const db = getDb();
    return db.collection("users").findOne({ id: data.userId });
  }

  static updataOneById(data) {
    const db = getDb();
    return db.collection("users").updateOne({ id: data.userId }, { $set: { force: data.forceData } });
  }
}

exports.User = User;
