// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
var axios = require("axios");
const {
    v4: uuidv4
} = require('uuid');

const consts = require("../utils/consts");

function populateUserScores(user) {
    var header = {
        headers: {
            "Authorization": `token ${user.accessToken}`
        }
    }
    var uLangs = [];
    var langsDone = 0;
    var langsTotal = 0;
    axios.get(consts.GITHUB_REPO_URL, header).then((repoRes) => {
        var repos = repoRes.data;
        langsTotal = repos.length;
        for (var i = 0; i < repos.length; i++) {
            axios.get(repos[i].languages_url, header).then((repoLangs) => {
                repoLangs.data.map((percent, val) => {
                    if (uLangs[val]) {
                        uLangs[val] += percent;
                    } else {
                        uLangs[val] = percent;
                    }
                });
                langsDone++;
                if (langsDone == langsTotal) {
                    calculateTotal(uLangs);
                }
            });
        }
    });
}

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
        axios.post(consts.GITHUB_AUTH_URL, params).then((response) => {
            var access_token = response.data.substring(response.data.indexOf("=") + 1, response.data.indexOf("&"));
            console.log("Access Token: " + access_token);
            var header = {
                headers: {
                    "Authorization": `token ${access_token}`
                }
            }
            axios.get(consts.GITHUB_USER_URL, header).then((gitUser) => {
                console.log(gitUser.data);
                console.log(gitUser.headers);
                var newCookie = uuidv4();
                var cookieCreationDate = Date.now();
                db.User.findOrCreate({
                    where: {
                        githubId: gitUser.data.id
                    },
                    defaults: {
                        accessToken: access_token,
                        cookie: newCookie,
                        cookieCreated: cookieCreationDate
                    }
                }).then((dbReturn) => {
                    res.cookie("uuid", dbReturn[0].dataValues.cookie, {
                        maxAge: consts.MAX_LOGIN_TIME
                    });
                    res.status(200);
                    if (dbReturn[1]) {
                        console.log("Created New User");
                        res.send("Welcome new User: " + gitUser.data.name);
                        populateUserScores(dbReturn.dataValues);
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