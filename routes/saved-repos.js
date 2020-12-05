var path = require("path");
var fs = require("fs");
var db = require("../models");
var axios = require("axios");
const {
    v4: uuidv4
} = require('uuid');

const consts = require("../utils/consts");

module.exports = function(app) {

    app.get("/savedRepos", (req,res) => {

        if (!req.cookies.uuid) {
            res.redirect("/");
        };   

        if (req.cookies.uuid) {
            
            db.User.findOne({
                where: {
                    cookie: req.cookies.uuid
                }
            }).then((loggedUser) => {

                var id = loggedUser.id;
                
                db.SavedRepos.findAll({
                    where: {
                        UseredId: id
                    }
                }).then((savedRepos) => {
                    console.log(savedRepos)
                })

            })

        }

    });


};