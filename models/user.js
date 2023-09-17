const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(id, password) {
    this.id = id;
    this.password = password;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static findById(data) {
    const db = getDb();
    return db.collection("users").findOne({ id: data.userId });
  }
}

exports.User = User;
