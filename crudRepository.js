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

  static findAll () {
    return new Promise((resolve, reject) => {
      this.pool.query('SELECT * FROM task', (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
}

module.exports = crudRepository
