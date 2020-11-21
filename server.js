const express = require('express');
const PORT = process.env.PORT || 8080;

var app;

var db = require("./models");

function Main() {
    console.log("Setting up Webservice");

    app = express();
    app.use(express.static("public"));

    app.use(express.json()); // for parsing application/json
    app.use(express.urlencoded({
        extended: true
    })); // for parsing application/x-www-form-urlencoded

    require("./routes/html-routes.js")(app);
    require("./routes/user-management.js")(app);

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

    db.sequelize.sync({
        force: true
    }).then(function() {
        app.listen(PORT, function() {
            console.log("App listening on PORT " + PORT);
        });
    });

}

Main();