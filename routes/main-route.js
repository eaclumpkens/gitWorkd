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

                // pull NONE current user repos
                db.Repo.findAll({}).then((allRepos) => {
                    for (var i = 0; i < allRepos.length; i++) {
                        if (id !== allRepos[i].dataValues.UserId) {
                            otherRepos.push(allRepos[i].dataValues);
                        };
                    };
                });

                // pull language names
                var keys = Object.keys(otherRepos[0]);
                    for (var k = 0; k < keys.length; k++) {
                        console.log(keys[k]);
                }

                // loop through repos and compare user langs
                for (var a = 0; a < otherRepos.length; a++) {
                    var compScore = 0;



                    

                }

            })

        }

        res.redirect("/");
    })


}