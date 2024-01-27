const express = require("express");
const { Pool } = require("pg");
const { connectLiveReload } = require("./liveReloadSupport");
require("dotenv").config(); //load key-value pairs from any .env files into process.env
const { randomDieRoll } = require("./dice");
const cors = require("cors");
const session = require("express-session");

/**
 * Returns the value of the given environment variable, or throws an error if it does not exist.
 * @param {string} envVarKey key of environment variable to obtain
 */
function getEnvVarOrFail(envVarKey) {
    const foundValue = process.env[envVarKey];
    if (!foundValue) {
        throw new Error(
            `Missing expected env var ${envVarKey}.  Have you set it in an .env file or via host UI?`,
        );
    }
    return foundValue;
}

//docs: https://node-postgres.com/apis/pool
const pool = new Pool({
    connectionString: getEnvVarOrFail("DATABASE_URL"),
    max: 2, //keep this low. elephantSQL doesn't let you have a lot of connections for free.
});

const app = express();

//any requests for files which are found in public will be served.  e.g. /index.html will serve from /oublic/index.html
app.use(express.static("public"));

//parse any form content from request body (application/x-www-form-urlencoded), making available as req.body
app.use(express.urlencoded({ extended: false }));

//auto-include CORS headers to allow consumption of our content by in-browser js loaded from elsewhere
app.use(cors());

app.use(
    session({
        secret: getEnvVarOrFail("SESSION_SECRET"),
        resave: false,
        saveUninitialized: false,
    }),
);

app.set("view engine", "ejs");

if (process.env.NODE_ENV === "development") {
    console.log("Enabling live-reloading of html pages on file save.");
    app.use(connectLiveReload());
}

//configure the server's route handlers
app.get("/", (req, res) => {
    res.send("Ok here is the root document response.  try /randomRoll");
});

app.get("/products.json", async (req, res) => {
    const dbResult = await pool.query("select * from products limit 20");
    const rows = dbResult.rows;
    console.log("queried db and got : " + dbResult.rowCount + " row(s)");
    res.json(rows);
});

app.get("/products", async (req, res) => {
    const dbResult = await pool.query("select * from products limit 20");
    const rows = dbResult.rows;
    console.log("queried db and got : " + dbResult.rowCount + " row(s)");
    res.render("pages/products", { products: rows });
});

app.get("/one", (req, res) => {
    console.log("foo");
    res.render("pages/one");
});

app.get("/two", (req, res) => {
    console.log("two");
    res.render("pages/two");
});

app.get("/three", (req, res) => {
    console.log("three");
    res.render("pages/three");
});

app.get("/four", (req, res) => {
    console.log("four");

    console.log("see session", req.session);
    res.render("pages/four", { session: req.session });
});

app.post("/addToSession", (req, res) => {
    if (!("messages" in req.session)) {
        req.session.messages = [];
    }
    req.session.messages.push(`${req.body.message} at ${new Date()}`);
    console.log("/addToSession");
    res.redirect("/four");
});

app.get("/formDemo", (req, res) => {
    console.log("GET /formDemo");
    res.render("pages/formDemo");
});

app.post("/formDemo", (req, res) => {
    console.log("POST /formDemo");
    console.log("req.body is: ", req.body);
    //Don't forget to sanitise and validate user-supplied data before using it
    const formData = req.body;
    //just send it back to the user for now
    res.json(formData);
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
