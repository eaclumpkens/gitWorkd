// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

const SIGN_UP_URL = "https://github.com/login/oauth/authorize?scope=user:email&client_id=";

// Routes
// =============================================================
module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.
    // index route loads view.html
    app.get("/", function(req, res) {
        var linkurl = SIGN_UP_URL + process.env.GITHUB_CLIENT_ID;
        res.render("signup", {
            link: linkurl
        })
    });

};