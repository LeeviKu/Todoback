const express = require('express')
const cors = require('cors')
const tasks = require('./routes/tasks.js')
const crud = require('./crudRepository.js')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/tasks', tasks)

const port = process.env.PORT || 8080
const db = [{ name: 'tiina' }, { name: 'jack' }]

app.get('/api/names', (req, res) => {
  res.send(db)
})

crud.connect()

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`)
})
