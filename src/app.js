import { app } from "./support/setupExpress";
import { query } from "./support/db";
import { randomDieRoll } from "./dice";

app.get("/", (req, res) => {
    res.json({
        outcome: "success",
        message: "hello world!",
    });
});

//An example route that makes an SQL query to the db.
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
const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(
        `Your express app started listening on ${PORT}, at ${new Date()}`
    );
});
