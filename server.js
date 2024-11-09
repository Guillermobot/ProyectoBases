require("dotenv").config(); // Carga las variables de entorno desde .env

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// Primero creamos la instancia de Express
const app = express();

// Habilitamos CORS después de definir la app
app.use(cors());

const port = process.env.PORT || 3000; // Puerto configurado en .env o por defecto 3000

// Configuración de la conexión a la base de datos MySQL usando variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Establecer la conexión con la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

// Definir una ruta de ejemplo
app.get("/", (req, res) => {
  res.send("¡Hola Mundo!");
});

// Ruta para obtener los elementos del menú desde la base de datos
app.get("/menu-items", (req, res) => {
  db.query(
    "SELECT nombre, descripcion, precio FROM menu_items",
    (err, results) => {
      if (err) {
        console.error("Error al hacer la consulta:", err);
        return res.status(500).send("Error al obtener los elementos del menú");
      }
      res.json(results); // Responder con los resultados en formato JSON
    }
  );
});

app.get("/cervezas", (req, res) => {
  db.query(
    "SELECT nombre, tipo, precio FROM cervezas WHERE cerveceria_id=2",
    (err, results) => {
      if (err) {
        console.error("Error al hacer la consulta:", err);
        return res.status(500).send("Error al obtener los elementos del menú");
      }
      res.json(results); // Responder con los resultados en formato JSON
    }
  );
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
