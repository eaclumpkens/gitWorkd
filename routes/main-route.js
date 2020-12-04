var path = require("path");
var db = require("../models");
var axios = require("axios");
const {
    v4: uuidv4
} = require('uuid');

var otherRepos = [];

module.exports = function(app) {

    app.get("/main", (req, res) => {
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

                    // pull language keys 
                    var keys = Object.keys(otherRepos[0]);
                    var languages = [];
                    for (var x = 0; x < keys.length; x++) {
                        if (keys[x] === 'id' || keys[x] === 'title' || keys[x] === 'description' || keys[x] === 'githubId' || keys[x] === 'createdAt' || keys[x] === 'updatedAt' || keys[x] === 'UserId') {
                            continue;
                        } else {
                            languages.push(keys[x]);
                        }
                    };

                    // iterate through repos
                    for (var a = 0; a < otherRepos.length; a++) {
                        var compScore = 0;

                        // iterate through language keys
                        for (var b = 0; b < languages.length; b++) {
                            

                            Object.entries(otherRepos[a]).forEach(([key, value]) => {
                                if (key === languages[b]) {
                                    console.log(`${key}: ${value}`);
                                };
                            });
                            


                        }
    
    
                    };

                });   
            })

        }

        res.redirect("/");
    })


}