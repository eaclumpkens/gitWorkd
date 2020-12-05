var path = require("path");
var db = require("../models");
var axios = require("axios");
const {
    v4: uuidv4
} = require('uuid');

const consts = require("../utils/consts");

var mockRepos = [
    {
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

        res.render("main-feed", {repos: mockRepos});

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

                        // pull user data
                        db.User.findOne({
                            where: {
                                id: userId
                            }
                        }).then((result) => {

                            var header = {
                                headers: {
                                    "Authorization": `token ${result.dataValues.accessToken}`
                                }
                            }

                            // get user data
                            axios.get(consts.GITHUB_USER_URL, header).then((user) => {

                                repoData["username"] = `${user.data.login}`;
                                repoData["avatar_url"] = `${user.data.avatar_url}`;
                                repoData["github_url"] = `${user.data.html_url}`;
                                repoData["repo_url"] = `https://github.com/${user.data.login.toLowerCase()}/${repoData.title}`

                                repos.push(repoData);
                            })

                        });
                        
                    };

                });   
            });
        };
    });
};