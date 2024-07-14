"use strict";

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const basename = path.basename(__filename);
const config = require("../config");
const { camelCase, upperFirst } = require("lodash");

// Connect to MongoDB
mongoose.connect(config.get("db.uri"), {
  dbName: config.get("db.name")
});

const connection = mongoose.connection;
connection.on("error", (err) => {
  console.error("Unable to connect to the database:", err);
});
connection.once("connected", () => {
  console.warn("db connectioned.");
});

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    const name = upperFirst(camelCase(model.modelName));
    db[name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
