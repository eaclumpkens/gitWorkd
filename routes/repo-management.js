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
                if (!loggedUser) {
                    res.redirect("/");
                    return;
                }

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

                    } else {
                        console.log("Nothin");
                    }

                }).catch((err) => {
                    console.log(err);
                })

            })
        } else {
            console.log("No Cookie, Redirecting");
            res.redirect("/");
        }

    });

    app.post("/api/postRepo", (req, res) => {
        var repos = req.body.Repos;

        if (!req.cookies.uuid) {
            res.status(500);
            res.send("Not logged in");
            return;
        }

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
            for (var i = 0; i < repos.length; i++) {
                console.log(repos[i]);
                db.Repo.findOne({
                    where: {
                        githubId: repos[i]
                    }
                }).then((dbRepo) => {
                    console.log(dbRepo);
                    if (dbRepo) {
                        console.log("Cannot add " + dbRepo.githubId + " already exists");
                        return;
                    } else {
                        console.log("adding repo" + repos[i]);
                    }
                    axios.get(consts.GITHUB_REPO_BY_ID + repos[i], header).then((repoInfo) => {
                        console.log(repoInfo.data);
                    });

                });
            }

        }).catch((err) => {
            console.log(err);
        });
        res.status(200);
        res.send("okay");
    });
}