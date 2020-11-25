// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
var axios = require("axios");
const {
    v4: uuidv4
} = require('uuid');

const consts = require("../utils/consts");

function userRepos(user) {
    var header = {
        headers: {
            "Authorization": `token ${user.accessToken}`
        }
    }

    // axios.get(consts.GITHUB_REPO_URL, header).then((repositories) => {
    //     var repos = repositories.data;

    //     db.Repo.findOrCreate({
    //         where
    //     })

    // })
}

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
                if (loggedUser) {
                    //TODO: Get user Repos
                    res.render("AddRepo", {
                        //TODO: FILL WITH USEFULL INFORMATION EVENTUALLY SOMETIME

                    });
                }
            });
        } else {
            //TODO REDIRECT TO MAIN
        }
    });
}