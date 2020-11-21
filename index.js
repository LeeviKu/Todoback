const express = require("express");
const cors = require("cors");
const tasks = require("./routes/tasks.js");
const crud = require("./database/api.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/tasks", tasks);

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
  crud
    .connect()
    .then(console.log("connected"))
    .catch((err) => console.log(err));
});
