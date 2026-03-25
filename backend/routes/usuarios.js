const express = require("express");
const router = express.Router();
const pool = require("../db");
const readSQL = require("../utils/readSql");

const queries = readSQL("usuarios.sql").split(";");

// CREATE
router.post("/", async (req, res) => {
  const { nombre, email, edad } = req.body;
  const result = await pool.query(queries[0], [nombre, email, edad]);
  res.json(result.rows[0]);
});

// READ
router.get("/", async (req, res) => {
  const result = await pool.query(queries[1]);
  res.json(result.rows);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, email, edad } = req.body;

  const result = await pool.query(queries[2], [
    nombre,
    email,
    edad,
    id
  ]);

  res.json(result.rows[0]);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(queries[3], [id]);
  res.sendStatus(204);
});

module.exports = router;