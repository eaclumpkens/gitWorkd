// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
const db = require("../models");
const consts = require("../utils/consts");
var axios = require("axios");

const SIGN_UP_URL = "https://github.com/login/oauth/authorize?scope=user:email&client_id=";

// Routes
// =============================================================
module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads view.html
    app.get("/", function(req, res) {
        console.log('Cookies: ', req.cookies);
        if (req.cookies.uuid) {
            db.User.findOne({
                where: {
                    cookie: req.cookies.uuid
                }
            }).then((loggedUser) => {
                console.log(loggedUser);
                if (loggedUser) {
                    var header = {
                        headers: {
                            "Authorization": `token ${loggedUser.dataValues.accessToken}`
                        }
                    }
                    axios.get(consts.GITHUB_USER_URL, header).then((gitUser) => {
                        res.status(200);
                        res.send("Weclome back " + gitUser.data.name);
                    }).catch((moo) => {
                        var linkurl = consts.SIGN_UP_URL + process.env.GITHUB_CLIENT_ID;
                        res.render("signup", {
                            link: linkurl
                        });
                    });
                } else {
                    var linkurl = consts.SIGN_UP_URL + process.env.GITHUB_CLIENT_ID;
                    res.render("signup", {
                        link: linkurl
                    });
                }
            });
        } else {
            var linkurl = consts.SIGN_UP_URL + process.env.GITHUB_CLIENT_ID;
            res.render("signup", {
                link: linkurl
            });
        }
    });

};