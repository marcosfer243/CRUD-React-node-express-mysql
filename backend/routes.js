const express = require("express");
const routes = express.Router();
const connection = require("./connection");

routes.get("/", (req, res) => {
  const sql = `SELECT * FROM libros`;

  connection.query(sql, (err, rows) => {
    if (err) return res.send(err);
    //{ message: `Lista de Libros`, data: rows }
    res.json(rows);
  });
});

routes.get("/:id", (req, res) => {
  const sql = `SELECT * FROM libros
  WHERE id=?`;
  const {
    params: { id },
  } = req;

  connection.query(sql, [id], (err, rows) => {
    if (err) return res.send(err);

    res.json(rows);
  });
});

routes.post("/", (req, res) => {
  const sql = `INSERT INTO libros(titulo,autor,edicion)
               VALUES(?,?,?)`;
  const {
    body: { titulo, autor, edicion },
  } = req;

  connection.query(sql, [titulo, autor, edicion], (err, rows) => {
    if (err) return res.send(err);

    res.send("New book has been addded");
  });
});

routes.delete("/:id", (req, res) => {
  const sql = `DELETE FROM libros
               WHERE id=?`;
  const {
    params: { id },
  } = req;

  connection.query(sql, [id], (err, rows) => {
    if (err) return res.send(err);

    res.send("This book has been deleted");
  });
});

routes.put("/:id", (req, res) => {
  const sql = `UPDATE libros
              SET titulo=?,autor=?,edicion=?
              WHERE id=?`;

  const {
    body: { titulo, autor, edicion },
  } = req;

  const {
    params: { id },
  } = req;

  connection.query(sql, [titulo, autor, edicion, id], (err, rows) => {
    if (err) return res.send(err);

    res.json(rows);
  });
});

module.exports = routes;
