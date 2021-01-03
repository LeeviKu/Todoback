const express = require("express");
const cors = require("cors");
const tasks = require("./routes/tasks.js");
const lists = require("./routes/lists.js");
const crud = require("./database/api.js");

const app = express();
app.use(cors());
app.use(express.json());
// checks apikey
app.use("/api", async function (req, res, next) {
  let keyFound = false;
  const apikeys = await crud.getApikeys();
  await apikeys.map((key) => {
    if (key.apikey === Number(req.query.apikey)) {
      keyFound = true;
      next();
    }
  });
  if (!keyFound) {
    res.status(401);
    res.send({ msg: "Apikey is not correct" });
    console.error(new Error("Apikey is not correct"));
  }
});
app.use("/api/tasks", tasks);
app.use("/api/lists", lists);
app.use(express.static("frontend/build"));

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
  crud
    .connect()
    .then(console.log("connected"))
    .catch((err) => console.error(err));
});
