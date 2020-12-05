var path = require("path");
var db = require("../models");
var axios = require("axios");
const {
    v4: uuidv4
} = require('uuid');

const consts = require("../utils/consts");

var otherRepos = [];

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

                // pull NONE USER repos
                db.Repo.findAll({}).then((allRepos) => {

                    for (var i = 0; i < allRepos.length; i++) {
                        if (id !== allRepos[i].dataValues.UserId) {
                            otherRepos.push(allRepos[i].dataValues);
                        };
                    };

                    // iterate through repos
                    for (var a = 0; a < otherRepos.length; a++) {

                        
                        var repos = [];
                        var repoData = {};

                        // pull user data
                        var userId = otherRepos[a].UserId;
                        var username;

                        db.User.findOne({
                            where: {
                                id: userId
                            }
                        }).then((result) => {

                            console.log(result);


                        })
                        
                        
                        // pull none null fields
                        Object.entries(otherRepos[a]).forEach(([key, value]) => {
                            if (value !== null) {
                                    repoData[`${key}`] = `${value}`;
                                    repos.push(repoData);
                            }
                        });



                        console.log(repos);
                    };

                    
    
    
                    
                });   
            });
        };
    });
};