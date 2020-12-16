const express = require('express');
var cookieParser = require('cookie-parser');
var compression = require("compression");
const PORT = process.env.PORT || 8080;

var app;


var db = require("./models");

function Main() {
    console.log("Setting up Webservice");

    app = express();
    app.use(compression());
    app.use(express.static("public"));


    app.use(express.json()); // for parsing application/json
    app.use(express.urlencoded({
        extended: true
    })); // for parsing application/x-www-form-urlencoded
    app.use(cookieParser()); //Used for parsing Cookies


    var exphbs = require("express-handlebars");

    app.engine("handlebars", exphbs({
        defaultLayout: "main"
    }));
    app.set("view engine", "handlebars");

    require("./routes/html-routes.js")(app);
    require("./routes/user-management.js")(app);
    require("./routes/repo-management.js")(app);
    require("./routes/user-repos.js")(app);
    require("./routes/main-route.js")(app);


    db.sequelize.sync({
        force: false
    }).then(function() {
        app.listen(PORT, function() {
            console.log("App listening on PORT " + PORT);
        });
    });

}

Main();