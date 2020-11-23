// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
var axios = require("axios");
const {
    uuid
} = require('uuidv4');

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
            var access_token = response.data.substring(response.data.indexOf("=") + 1, response.data.indexOf("&"));
            console.log("Access Token: " + access_token);
            var header = {
                headers: {
                    "Authorization": `token ${access_token}`
                }
            }
            axios.get(GITHUB_USER_URL, header).then((gitUser) => {
                console.log(gitUser.data);
                var newCookie = uuid();
                var cookieCreationDate = Date.now();
                db.User.findOrCreate({
                    where: {
                        githubId: gitUser.data.id
                    },
                    defaults: {
                        name: gitUser.data.name,
                        accessToken: access_token,
                        cookie: newCookie,
                        cookieCreated: cookieCreationDate
                    }
                }).then((dbReturn) => {
                    res.cookie("uuid", dbReturn[0].dataValues.cookie, {
                        maxAge: MAX_LOGIN_TIME
                    });
                    res.status(200);
                    if (user[1]) {
                        console.log("Created New User");
                        res.send("Welcome new User: " + gitUser.data.name);
                    } else {
                        res.send("Weclome back " + gitUser.data.name);
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