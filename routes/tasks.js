const express = require('express')
const crud = require('../crudRepository.js')

const router = express.Router()

router.get('/', async (req, res) => {
  const response = await crud.findAllTasks()
  res.send(response)
})

router.get('/:id([0-9]+)', async (req, res) => {
  const response = await crud.findTaskById(Number(req.params.id))
  res.send(response)
})

module.exports = router
