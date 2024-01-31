const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const dotenv=require("dotenv");
dotenv.config({path :'.env'});
app.use(cors());
app.use(express.json());
const port = process.env.PORT;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api/dev", require("./Routes/developer"));
app.use("/api/task", require("./Routes/tasks"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
