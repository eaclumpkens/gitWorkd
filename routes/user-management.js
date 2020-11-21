// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
var axios = require("axios");

const GITHUB_AUTH_URL = "https://github.com/login/oauth/access_token";

// Routes
// =============================================================
module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads view.html
    app.get("/api/gitRecieved", function(req, res) {
        var code = req.query.code;
        var params = {
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            client_id: process.env.GITHUB_CLIENT_ID,
            code: code
        }
        axios.post(GITHUB_AUTH_URL, params).then((response) => {
            console.log(response);
            res.status(200);
            res.send("It worked!!!!1!!!");
        }).catch((err) => {
            console.log("Error Authenticating User");
            console.log(err);
            res.status(404);
            res.send("YOU FAILED!!!1!!!");
        })
    });

};