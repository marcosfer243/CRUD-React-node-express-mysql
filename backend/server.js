const express = require("express");
const mysql = require("mysql2");
const myconn = require("express-myconnection");
const cors = require("cors");

const routes = require("./routes");

const app = express();

//middlewares --------------------------------------------------
app.use(express.json());
app.use(cors());
app.use("/api", routes);

app.listen(8411, () => {
  console.log(`Server running at port ${8411}`);
});
