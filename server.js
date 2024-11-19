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

// Ruta de ejemplo
app.get("/", (req, res) => {
  res.send("¡Hola Mundo!");
});

// Ruta dinámica para obtener cervezas de una cervecería específica
app.get("/cervezas/:cerveceriaId", (req, res) => {
  const cerveceriaId = req.params.cerveceriaId; // Obtener el ID de cervecería desde la URL

  db.query(
    "SELECT nombre, estilo, tipo, porcentaje_alcohol, precio FROM cervezas WHERE cerveceria_id = ?",
    [cerveceriaId], // Usamos el parámetro cervecería para hacer la consulta
    (err, results) => {
      if (err) {
        console.error("Error al hacer la consulta:", err);
        return res.status(500).send("Error al obtener los elementos del menú");
      }
      res.json(results); // Responder con los resultados en formato JSON
    }
  );
});

// Ruta para obtener el promedio de calificaciones por cervecería
app.get("/reportes/calificaciones", (req, res) => {
  const query = `
    SELECT cerveceria_id, nombre AS cerveceria, AVG(calificacion) AS promedio_calificacion, COUNT(calificacion) AS total_calificaciones
    FROM cervezas
    WHERE cerveceria_id IS NOT NULL
    GROUP BY cerveceria_id, nombre
    ORDER BY promedio_calificacion DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al hacer la consulta:", err);
      return res.status(500).send("Error al obtener las calificaciones");
    }
    res.json(results); // Devolver los resultados en formato JSON
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
