const express = require("express");
const { Pool } = require("pg");
const { randomDieRoll } = require("./dice");
const { connectLiveReload } = require("./liveReloadSupport");
require("dotenv").config();

if (!process.env.DATABASE_URL) {
    throw new Error(
        "no DATABASE_URL env var - have you set it in .env file or via host interface?",
    );
}

const app = express();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(connectLiveReload());

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

app.get("/one", (req, res) => {
    console.log("foo");
    res.render("one");
});

app.get("/two", (req, res) => {
    console.log("two");
    res.render("two");
});

app.get("/three", (req, res) => {
    res.render("three");
});

app.get("/randomRoll", (req, res) => {
    const number = randomDieRoll();
    res.send("NUMBER IS : " + number);
});

//start the server listening
app.listen(3000, () => {
    console.log("your express app started running!");
});
