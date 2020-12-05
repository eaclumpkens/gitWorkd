var path = require("path");
var db = require("../models");
var axios = require("axios");
const {
    v4: uuidv4
} = require('uuid');

const consts = require("../utils/consts");
const userRepos = require("./user-repos");

var mockRepos = [{
        title: "Eat-Da-Burger",
        username: "nickelme",
        tech: "JavaScript, Handlebars, MySQL",
        compat: "100%",
        link: "https://www.google.com"
    },
    {
        title: "Note Taker",
        username: "eaclumpkens",
        tech: "JavaScript, Handlebars, MySQL",
        compat: "90%",
        link: "https://www.google.com"
    },
    {
        title: "Random Repo",
        username: "twkirkpatrick",
        tech: "JavaScript, Handlebars, MySQL",
        compat: "80%",
        link: "https://www.google.com"
    },

]

module.exports = function(app) {

    app.get("/main", (req, res) => {

        var otherRepos = [];

        res.render("main-feed", {
            repos: mockRepos
        });

        // get current user
        if (req.cookies.uuid) {
            db.User.findOne({
                where: {
                    cookie: req.cookies.uuid
                }
            }).then((loggedUser) => {
                // pull userid
                var id = loggedUser.id;

                // pull all repos
                db.Repo.findAll({}).then((allRepos) => {

                    // pull NONE USER repos
                    for (var i = 0; i < allRepos.length; i++) {
                        if (id !== allRepos[i].dataValues.UserId) {
                            otherRepos.push(allRepos[i].dataValues);
                        };
                    };

                    var repos = [];
                    var totalRepos = otherRepos.length;
                    var reposCounted = 0;
                    // iterate through repos
                    for (var a = 0; a < otherRepos.length; a++) {

                        var repoData = {};
                        var userId = otherRepos[a].UserId;

                        // pull none null fields
                        Object.entries(otherRepos[a]).forEach(([key, value]) => {
                            if (value !== null) {
                                repoData[`${key}`] = `${value}`;
                            }
                        });

                        // get user data
                        var repoUrl = `${consts.GITHUB_REPO_URL}${repoData.githubId}`;
                        console.log(repoUrl);
                        axios.get(repoUrl).then((repoFromGithub) => {

                            repoData["username"] = `${repoFromGithub.data.owner.login}`;
                            repoData["avatar_url"] = `${repoFromGithub.data.owner.avatar_url}`;
                            repoData["github_url"] = `${repoFromGithub.data.owner.html_url}`;
                            repoData["repo_url"] = `${repoFromGithub.data.url}`

                            repos.push(repoData);
                            reposCounted++;
                            if (reposCounted == totalRepos) {
                                console.log(repos);
                            }
                        });
                    };

                });
            });
        };
    });
};