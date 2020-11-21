const express = require('express')
const crud = require('../crudRepository.js')

const router = express.Router()

router.get('/', async (req, res) => {
  const response = await crud.findAll()
  res.send(response)
})

module.exports = router
