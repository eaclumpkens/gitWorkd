// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
var axios = require("axios");
const {
    UUIDV4
} = require("sequelize");
const {
    result
} = require("lodash");

const GITHUB_AUTH_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USER_URL = "https://api.github.com/user"

//30 min * 60 secs * 1000ms to get 30min in ms
const MAX_LOGIN_TIME = 30 * 60 * 1000;

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
            var access_token = response.data.substring(response.data.indexOf("="), response.data.indexOf("&"));
            console.log("Access Token: " + access_token);
            var header = {
                headers: {
                    "Authorization": `token ${access_token}`
                }
            }
            axios.get(GITHUB_USER_URL, header).then((gitUser) => {
                console.log(gitUser.data);
                db.User.findOrCreate({
                    where: {
                        githubId: gitUser.data.id
                    },
                    defaults: {
                        name: gitUser.data.name,
                        accessToken: access_token,
                        cookie: UUIDV4(),
                        cookieCreated: Date.now()
                    }
                }).then((user, created) => {
                    res.cookie("uuid", user.cookie, {
                        maxAge: MAX_LOGIN_TIME
                    });
                    res.status(200);
                    if (created) {
                        console.log("Created New User");
                        res.send("Welcome new User: " + gitUser.name);
                    } else {
                        res.send("Weclome back " + gitUser.name);
                    }
                });
            });
        }).catch((err) => {
            console.log("Error Authenticating User");
            console.log(err);
            res.status(404);
            res.send("YOU FAILED!!!1!!!");
        })
    });

};