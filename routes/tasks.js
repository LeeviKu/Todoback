const express = require("express");
const crud = require("../database/api.js");
const Task = require("../models/taskModel.js");

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const response = await crud.findAllTasks(req.query, res);
  res.send(response);
});

router.get("/:id([0-9]+)", async (req, res) => {
  const response = await crud.findTaskById(Number(req.params.id));
  res.send(response);
});

router.post("/", async (req, res) => {
  const task = new Task(
    req.body.user_id,
    req.body.name,
    req.body.description,
    req.body.priority,
    req.body.deadline
  );
  await crud.saveTask(task);
  res.send(task);
});

router.delete("/:urlId([1-9]+$)", async (req, res) => {
  const id = Number(req.params.urlId);
  const response = await crud.deleteTask(id);
  res.send(response);
});

module.exports = router;
