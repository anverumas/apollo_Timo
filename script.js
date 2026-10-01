const express = require("express");
const app = express();
const PORT = 3000;


const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "YOUR_MYSQL_PASSWORD",
  database: "film_database"
});

app.get("/films", async (req, res) => {
  try {
    const [films] = await db.query(
      "SELECT * FROM films ORDER BY title"
    );

    res.json(films);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});