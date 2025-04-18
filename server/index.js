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
app.get("/api/flavors/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const SQL = `
        SELECT FROM flavors WHERE id = $1      
    `;
    const response = await client.query(SQL, [id]);
    res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
});
app.post("/api/flavors", async (req, res, next) => {
  try {
    const { name, is_favorite } = req.body;
    const SQL = `
            INSERT INTO users(name, is_favorite) VALUES($1, $2) RETURNING *
        `;
    const response = await client.query(SQL, [name, is_favorite]);
    res.status(201).json(response.rows);
  } catch (error) {
    next(error);
  }
});
app.delete("/api/flavors/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const SQL = `
          DELETE FROM users WHERE id = $1
      `;
    await client.query(SQL, [id]);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
app.put("/api/flavors/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { is_favorite } = req.body;
    const SQL = `
              UPDATE users
              SET is_favorite = $1 
              where id = $2
              RETURNING *
          `;
    const response = await client.query(SQL, [is_favorite, id]);
    res.status(200).json(response.rows[0]);
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
