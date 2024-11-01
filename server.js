const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");
const app = express();
const port = 3000;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "TestTaskDB",
    password: "2015karl",
    port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

app.post("/api/transactions", async (req, res) => {
    const { dateTime, author, sum, category, comment } = req.body;

    try {
        await pool.query(
            "INSERT INTO transactions (dateTime, author, sum, category, comment) VALUES ($1, $2, $3, $4, $5)",
            [dateTime, author, sum, category, comment]
        );
        res.status(201).send({ message: "Транзакция успешно добавлена!" });
    } catch (error) {
        console.error("Ошибка при добавлении данных:", error);
        res.status(500).send({ error: "Ошибка при добавлении данных" });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
