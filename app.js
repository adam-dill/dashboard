const express = require("express");
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = 5000;

app.use(cors());

app.get("/api/v1/ping", (req, res) => {
    res.status(200)
        .send({
            message: "Server is Running"
        });
});

app.get("/api/v1/*", (req, res) => {
    const route = req.params[0]?.toUpperCase();
    const key = process.env[route];
    // TRELLO is special
    if (route === "TRELLO") {
        console.log('this is trello');
        const token = process.env.TRELLO_TOKEN;
        const board = process.env.TRELLO_BOARD;
        const list = process.env.TRELLO_LIST;
    }
    res.status(200).send({message: key});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
