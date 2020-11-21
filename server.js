const express = require('express');
const PORT = process.env.PORT || 8080;

var app;

var db = require("./models");

function Main() {
    console.log("Setting up Webservice");

    app = express();
    app.use(express.static("res"));

    app.use(express.json()); // for parsing application/json
    app.use(express.urlencoded({
        extended: true
    })); // for parsing application/x-www-form-urlencoded

    app.engine("handlebars", exphbs({
        defaultLayout: "main"
    }));
    app.set("view engine", "handlebars");

    require("./routes/html-routes.js")(app);
    require("./routes/user-management.js")(app);

    db.sequelize.sync({
        force: true
    }).then(function() {
        app.listen(PORT, function() {
            console.log("App listening on PORT " + PORT);
        });
    });

}

Main();