// imports here for express and pg
const express = require("express");
const app = express();
const PORT = 3000;
const pg = require("pg");
const client = new pg.Client("postgres://localhost/acme_icecream");
const cors = require("cors");
// static routes here (you only need these for deployment)
app.use(cors());
app.use(express.json());
app.use(require("morgan")("dev"));
app.listen(PORT, () => {
  console.log(`I am listening on port number ${PORT}`);
});
// app routes here
app.get("/", (req, res, next) => {
  res.status(200).json({ message: "This works" });
});
app.get("/api/flavors", async (req, res, next) => {
  try {
    const SQL = `
        SELECT * from flavors
    `;
    const response = await client.query(SQL);
    res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
});

// create your init function
const init = async () => {
  await client.connect();
};
// init function invocation
init();
