const fs = require('fs');
const express = require("express");
const cors = require("cors");
const request = require('request');
const { response } = require("express");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
console.log('environment: ', process.env.NODE_ENV);

app.get("/api/v1/ping", (req, res) => {
    res.status(200).send({
        message: "Server is Running",
    });
});

const latitude = 43.0490693;
const longitude = -88.0059109;
const year = new Date().getFullYear();

const urls = {
    WEATHER: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=imperial&appid={0}`,
    NEWS: `https://newsapi.org/v2/top-headlines?country=us&apiKey={0}`,
    QUOTE: "https://quotes.rest/qod?language=en",
    CALENDAR: `https://calendarific.com/api/v2/holidays?&api_key={0}&country=US&year=${year}`,
    BACKGROUND: `https://wall.adamdill.com/api/images?key={0}&group=1`,
    TRENDS: `http://reddit-trends.adamdill.com//trends/limit/1`,
    TRELLO: `https://api.trello.com/1/lists/{0}/cards?key={1}&token={2}`,
};

app.get("/api/v1/*", (req, res) => {
    const route = req.params[0]?.toUpperCase();
    const key = process.env[route];
    
    if (process.env.NODE_ENV === "mock") {
        fs.readFile(`./mock/${route.toLowerCase()}.json`, "utf8", (err, response) => {
            if (err) {
                console.error(err);
                return;
            }
            const data = JSON.parse(response);
            res.status(200).send(data);
        });
    } else {
        // TRELLO is special
        const token = process.env.TRELLO_TOKEN;
        const board = process.env.TRELLO_BOARD;
        const list = process.env.TRELLO_LIST;

        const url = route === 'TRELLO'
            ? urls[route].format(list, key, token)
            : urls[route].format(key);

        request(url, { json: true }, (err, _, body) => {
            if (err) { 
                console.error(err); 
                res.status(500).send(err);
                return;
            }
            res.status(200).send(body);
        });
    }
});

String.prototype.format = function () {
    // store arguments in an array
    var args = arguments;
    console.log(args);
    // use replace to iterate over the string
    // select the match and check if related argument is present
    // if yes, replace the match with the argument
    return this.replace(/{([0-9]+)}/g, function (match, index) {
        // check if the argument is present
        console.log('matching', args[index]);
        return typeof args[index] == "undefined" ? match : args[index];
    });
};

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
