const express = require('express');
const PORT = process.env.PORT || 8080;

var app;

function Main() {
    console.log("Setting up Webservice");

    app = express();
    app.use(express.static("res"));

    app.use(express.json()); // for parsing application/json
    app.use(express.urlencoded({
        extended: true
    })); // for parsing application/x-www-form-urlencoded

    app.get("/api/gitRecieved", (req, res) => {
        var code = req.query.code;
        if (code) {
            res.status(200);
            res.send("GitHub OAuth Code Recieved: " + code);
        } else {
            res.status(404);
            res.send("Code not found");
        }
    });

    app.listen(PORT, () => {
        console.log(`Now Running at http://localhost:${PORT}`);
    });
}

Main();