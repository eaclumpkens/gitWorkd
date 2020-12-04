
var path = require("path");
var db = require("../models");
var axios = require("axios");
const {
    v4: uuidv4
} = require('uuid');

var myRepos = [];
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

                db.Repo.findAll({}).then((allRepos) => {

                    for (var i = 0; i < allRepos.length; i++) {

                        // pull NONE current user repos
                        if (id !== allRepos[i].dataValues.UserId) {
                            otherRepos.push(allRepos[i].dataValues);
                        } else {
                            myRepos.push(allRepos[i].dataValues);
                        }
                        
                    };
                    console.log("MY REPOSITORIES!!!!!!!!!!!!!!")
                    console.log(myRepos);
                    console.log("OTHER REPOSITORIES!!!!!!!!!!!!!!")
                    console.log(otherRepos);

                })

            })

        }
    
        res.redirect("/");
    })


}


