const { app } = require("./support/setupExpress");
const { query } = require("./support/db");
const { randomDieRoll } = require("./dice");

app.get("/", (req, res) => {
    res.json({
        outcome: "success",
        message: "hello world!",
    });
});

app.get("/db-check", async (req, res) => {
    try {
        const dbResult = await query("select * from my_table");
        res.json(dbResult.rows);
    } catch (error) {
        console.error("error handling db-check: ", error);
    }
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
