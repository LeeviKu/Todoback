const mysql = require("mysql");
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
      if (query.sort) {
        const orderBy = query.sort.slice(1);
        let order = query.sort.slice(0, 1);

        if (order === '-') {
          order = 'DESC';
        } else if (order === ' ') { // "+" === " "
          order = 'ASC'
        } else {
          res.status(400)
          res.send({"msg": "sort query should start with a - or +"})
          reject(new Error('sort query should start with a - or +'))
        }

        const sortSet = new Set(["deadline", "name", "priority"])
        if (!sortSet.has(orderBy)) {
          res.status(400)
          res.send({ "msg" : "You can only sort by deadline, name or priority" })
        }
        this.pool.query("SELECT * FROM task ORDER BY " + this.pool.escapeId(orderBy) + order, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      } else {
      this.pool.query("SELECT * FROM task", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
      }
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
