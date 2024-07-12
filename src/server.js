import { app } from "./support/setupExpress.js";
import { query } from "./support/db.js";
import { sum } from "./sum.js";

app.get("/", (req, res) => {
    res.json({
        outcome: "success",
        message: "hello world!  Try /sum/1/2 or /db-check",
    });
});
//just an example route handler.  delete it.
app.get("/sum/:a/:b", (req, res) => {
    const answer = sum(parseInt(req.params.a), parseInt(req.params.b));
    res.json({ answer });
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

// use the environment variable PORT, or 4000 as a fallback
const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(
        `Your express app started listening on ${PORT}, at ${new Date()}`
    );
});
