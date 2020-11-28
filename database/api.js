const mysql = require("mysql");
const queryParamHandler = require("../queryParamHandler.js");
const config = require("./config.js");

class crudRepository {
  static connect() {
    return new Promise((resolve, reject) => {
      this.pool = mysql.createPool(config);
      this.pool.getConnection((err, connection) => {
        if (err) reject(err);
        resolve(connection);
      });
    });
  }

  static findAllTasks(query, res) {
    return new Promise((resolve, reject) => {
      const queryParams = { "orderby": "" ,"limit": "", "offset": ""}
      this.paramHandler = new queryParamHandler(res, reject, this.pool)

      if (query.limit) {
        queryParams.limit = this.paramHandler.limit(query.limit)
      }

      if (query.offset) {
        queryParams.offset = this.paramHandler.offset(query.offset, query.limit)
      }

      if (query.sort) {
        queryParams.orderby = this.paramHandler.sort(query.sort)
      }

      this.pool.query("SELECT * FROM task" + queryParams.orderby + queryParams.limit + queryParams.offset, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static findTaskById(id) {
    return new Promise((resolve, reject) => {
      this.pool.query("SELECT * FROM task WHERE id = ?", id, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static saveTask(task) {
    return new Promise((resolve, reject) => {
      this.pool.query("INSERT INTO task SET ?", task, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static deleteTask(id) {
    return new Promise((resolve, reject) => {
      this.pool.query("DELETE FROM task WHERE id = ?", id, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = crudRepository;
