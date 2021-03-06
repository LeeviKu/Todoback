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

  static updateIsDone(id, isDoneState) {
    return new Promise((resolve, reject) => {
      const newValue = isDoneState ? 0 : 1;
      this.pool.query(
        `UPDATE task SET is_done = ${newValue} WHERE id = ?`,
        id,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }

  static findAllTasks(query, res) {
    return new Promise((resolve, reject) => {
      const queryParams = {
        orderby: "",
        limit: "",
        offset: "",
        search: "",
        list: "",
        searchFromList: "",
      };
      this.paramHandler = new queryParamHandler(res, reject, this.pool);

      if (query.search && query.list) {
        queryParams.searchFromList = this.paramHandler.searchFromList(
          query.search,
          query.list
        );
      } else if (query.search) {
        queryParams.search = this.paramHandler.search(query.search);
      } else if (query.list) {
        queryParams.list = this.paramHandler.list(query.list);
      }

      if (query.limit) {
        queryParams.limit = this.paramHandler.limit(query.limit);
      }

      if (query.offset) {
        queryParams.offset = this.paramHandler.offset(
          query.offset,
          query.limit
        );
      }

      if (query.sort) {
        queryParams.orderby = this.paramHandler.sort(query.sort);
      }

      console.log(
        "SELECT * FROM task" +
          queryParams.search +
          queryParams.searchFromList +
          queryParams.list +
          queryParams.orderby +
          queryParams.limit +
          queryParams.offset
      );

      this.pool.query(
        "SELECT * FROM task" +
          queryParams.search +
          queryParams.searchFromList +
          queryParams.list +
          queryParams.orderby +
          queryParams.limit +
          queryParams.offset,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
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

  static saveList(name) {
    return new Promise(async (resolve, reject) => {
      let duplicateCheckVar;
      this.pool.query(
        "SELECT * FROM list WHERE list_name=?",
        name,
        (err, result) => {
          if (err) reject(err);
          duplicateCheckVar = result;
          if (duplicateCheckVar.length === 0 && name !== "") {
            this.pool.query(
              "INSERT INTO list SET list_name=?",
              name,
              (err, result) => {
                if (err) reject(err);
                resolve(result);
              }
            );
          } else {
            resolve();
          }
        }
      );
    });
  }

  static findAllLists() {
    return new Promise((resolve, reject) => {
      this.pool.query("SELECT * FROM list", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static findListById(id) {
    return new Promise((resolve, reject) => {
      this.pool.query("SELECT * FROM list WHERE id = ?", id, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static deleteList(id) {
    return new Promise((resolve, reject) => {
      this.pool.query("DELETE FROM list WHERE id = ?", id, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static getApikeys() {
    return new Promise((resolve, reject) => {
      this.pool.query("SELECT * FROM apikey", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = crudRepository;
