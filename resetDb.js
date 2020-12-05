var db = require("./models");

db.sequelize.sync({
    force: true
}).then(function() {
    console.log("Cleared database!!!");
    db.sequelize.close().then(function() {
        console.log("Connection to DB Closed");
    })
});