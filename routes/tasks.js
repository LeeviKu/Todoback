const express = require('express')
const crud = require('../crudRepository.js')
const Task = require('../models/taskModel.js')

const router = express.Router()

router.get('/', async (req, res) => {
  const response = await crud.findAllTasks()
  res.send(response)
})

router.get('/:id([0-9]+)', async (req, res) => {
  const response = await crud.findTaskById(Number(req.params.id))
  res.send(response)
})

router.post('/', async (req, res) => {
  const task = new Task(req.body.user_id, req.body.name, req.body.description, req.body.priority, req.body.deadline)
  await crud.saveTask(task)
  res.send(task)
})

module.exports = router
