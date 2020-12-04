
var path = require("path");
var db = require("../models");
var axios = require("axios");
const {
    v4: uuidv4
} = require('uuid');

var myRepos = [];
var similarRepos = [];

module.exports = function(app) {

    app.get("/main", (req, res) => {

        if (req.cookies.uuid) {
            db.User.findOne({
                where: {
                    cookie: req.cookies.uuid
                }
            }).then((loggedUser) => {

                var id = loggedUser.id;

                db.Repo.findAll({}).then((allRepos) => {

                    console.log(allRepos.Repo);

                })

            })

        }
    
        res.redirect("/");
    })


}


