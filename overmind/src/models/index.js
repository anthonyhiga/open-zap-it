"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const onDiskConfig = require(__dirname + "/../config/on_disk_config.json")[env];
const db = {ready: Promise.resolve()};
const dbInMemory = {};

// We initilize the in memory db, which needs no config
const inMemorySequelize = new Sequelize("sqlite::memory:");

// We initialize the on disk db, which does need a config, especially if you are not using SQLITE
const onDiskSequelize =  onDiskConfig.use_env_variable ?  
  new Sequelize(process.env[onDiskConfig.use_env_variable], onDiskConfig) :
  new Sequelize(onDiskConfig.database, onDiskConfig.username, onDiskConfig.password, onDiskConfig);

//  Scan for models
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const inMemoryOnly = file.indexOf("memory_only") >= 2; // model name cannot be blank
    const model = inMemoryOnly ?  
      inMemorySequelize["import"](path.join(__dirname, file)) :
      onDiskSequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
    dbInMemory[model.name] = inMemoryOnly;
  });

const readyPromises = []; 
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    console.warn("Loading: " + modelName + " Type: " + (dbInMemory[modelName] ? "Memory Only" : "On Disk"));
    db[modelName].associate(db);
    readyPromises.push(db[modelName].sync()); 
  }
});

db.ready = Promise.all(readyPromises);
db.inMemorySequelize = inMemorySequelize;
db.onDiskSequelize = onDiskSequelize;

module.exports = db;
