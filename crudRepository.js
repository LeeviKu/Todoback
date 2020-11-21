const mysql = require('mysql')
const config = require('./config.js')

class crudRepository {
  static connect () {
    return new Promise((resolve, reject) => {
      this.pool = mysql.createPool(config)
      this.pool.getConnection((err, connection) => {
        if (err) reject(err)
        resolve(connection)
      })
    })
  }

  static findAllTasks () {
    return new Promise((resolve, reject) => {
      this.pool.query('SELECT * FROM task', (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }

  static findTaskById (id) {
    return new Promise((resolve, reject) => {
      this.pool.query('SELECT * FROM task WHERE id = ?', id, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
}

module.exports = crudRepository
