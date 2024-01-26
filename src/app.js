const express = require("express");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const { randomDieRoll } = require("./dice");
dotenv.config();

const app = express();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

//configure the server
app.get("/", (req, res) => {
    res.send("Ok here is the root document response.  try /randomRoll");
});

app.get("/products", async (req, res) => {
    const dbResult = await pool.query("select * from products limit 20");
    const rows = dbResult.rows;
    console.log("queried db and got : " + dbResult.rowCount + " row(s)");
    res.json(rows);
});

app.get("/randomRoll", (req, res) => {
    const number = randomDieRoll();
    res.send("NUMBER IS : " + number);
});

//start the server listening
app.listen(3000, () => {
    console.log("your express app started running!");
});
