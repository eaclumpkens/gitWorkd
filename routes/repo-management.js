// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
var axios = require("axios");
const {
    v4: uuidv4
} = require('uuid');

const consts = require("../utils/consts");

// Routes
// =============================================================
module.exports = function(app) {

    app.get("/addRepo", (req, res) => {

        if (req.cookies.uuid) {
            db.User.findOne({
                where: {
                    cookie: req.cookies.uuid
                }
            }).then((loggedUser) => {

                var header = {
                    headers: {
                        "Authorization": `token ${loggedUser.accessToken}`
                    }
                }

                axios.get(consts.GITHUB_REPO_URL, header).then((repos) => {

                    if (repos.data.length > 0) {

                        var handlebarsRepos = [];
                        for (var i = 0; i < repos.data.length; i++) {

                            if (repos.data[i].private) {
                                continue;
                            }

                            var nRepo = {
                                name: repos.data[i].name,
                                description: repos.data[i].description,
                                language: repos.data[i].language,
                                url: repos.data[i].html_url,
                                id: repos.data[i].id
                            };

                            handlebarsRepos.push(nRepo);
                        }

                        res.render("addRepo", {
                            repos: handlebarsRepos
                        });

                        console.log(handlebarsRepos);

                    } else {
                        console.log("Nothin");
                    }

                }).catch((err) => {
                    console.log(err);
                })

            })
        }

    });

    app.post("/api/postRepo", (req, res) => {
        var repos = req.body;
        for (var i = 0; i < repos.length; i++) {
            console.log(repos[i]);
        }
        res.status(204);
    });
}