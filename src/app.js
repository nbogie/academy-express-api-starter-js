const express = require("express");
const { Pool } = require("pg");
const { connectLiveReload } = require("./liveReloadSupport");
require("dotenv").config();
const { randomDieRoll } = require("./dice");

if (!process.env.DATABASE_URL) {
    throw new Error(
        "no DATABASE_URL env var - have you set it in .env file or via host interface?",
    );
}

//docs: https://node-postgres.com/apis/pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 2, //keep this low. elephantSQL doesn't let you have a lot of connections for free.
});

const app = express();

//any requests for files which are found in public will be served.  e.g. /index.html will serve from /oublic/index.html
app.use(express.static("public"));

app.set("view engine", "ejs");

if (process.env.NODE_ENV === "development") {
    console.log("Enabling live-reloading of html pages on file save.");
    app.use(connectLiveReload());
}

//configure the server's route handlers
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

// use the environment variable PORT, or 4000 as a fallback
const PORT_NUMBER = process.env.PORT ?? 4000;

//start the server listening
app.listen(PORT_NUMBER, () => {
    console.log("Your express app started running at " + new Date());
});