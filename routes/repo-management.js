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

                        console.log(repos.data.length);
                        console.log(repos.data[1]);

                    } else {
                        console.log("Nothin");
                    }

                }).catch((err) => {
                    console.log(err);
                })

            })
        }

    });
}