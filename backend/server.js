const express = require("express");
const cors = require("cors");
const pool = require("./db");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

async function initDB() {
  const sql = fs.readFileSync(
    path.join(__dirname, "sql/init.sql"),
    "utf-8"
  );

  await pool.query(sql);
  console.log("DB inicializada");
}

initDB();

const usuariosRoutes = require("./routes/usuarios");
app.use("/usuarios", usuariosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));