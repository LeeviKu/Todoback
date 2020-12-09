const express = require("express");
const crud = require("../database/api.js");

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const response = await crud.findAllLists();
  res.send(response);
});

router.get("/:id([0-9]+)", async (req, res) => {
  const response = await crud.findListById(Number(req.params.id));
  res.send(response);
});

router.post("/", async (req, res) => {
  await crud.saveList(req.body.list_name);
  res.send(req.body.list_name);
});

router.delete("/:urlId([1-9]+$)", async (req, res) => {
  const id = Number(req.params.urlId);
  const response = await crud.deleteList(id)
  res.send(response);
});

module.exports = router;