const { app } = require("./support/setupExpress");
const { query } = require("./support/db");

const { randomDieRoll } = require("./dice");

//configure the server's route handlers
app.get("/", (req, res) => {
    res.send("Ok here is the root document response.  try /randomRoll");
});

app.get("/products.json", async (req, res) => {
    const dbResult = await query(
        "select * from " +
            " products " +
            " inner join suppliers on products.supplier_id = suppliers.supplier_id " +
            "limit 20",
    );
    const rows = dbResult.rows;
    res.json(rows);
});

app.get("/products", async (req, res) => {
    const dbResult = await query(
        "select * from " +
            " products " +
            " inner join suppliers on products.supplier_id = suppliers.supplier_id " +
            "limit 20",
    );
    const rows = dbResult.rows;
    res.render("pages/products", { products: rows });
});

app.get("/one", (req, res) => {
    res.render("pages/one");
});

app.get("/two", (req, res) => {
    res.render("pages/two");
});

app.get("/three", (req, res) => {
    res.render("pages/three");
});

app.get("/four", (req, res) => {
    console.log("session content: ", req.session);
    res.render("pages/four", { session: req.session });
});

app.post("/addToSession", (req, res) => {
    if (!("messages" in req.session)) {
        req.session.messages = [];
    }
    req.session.messages.push(`${req.body.message} at ${new Date()}`);
    res.redirect("/four");
});

app.get("/formDemo", (req, res) => {
    res.render("pages/formDemo");
});

app.post("/formDemo", (req, res) => {
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
    console.log(
        `Your express app started listening on ${PORT_NUMBER} running at ${new Date()}`,
    );
});
