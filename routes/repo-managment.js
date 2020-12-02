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

    axios.get(consts.GITHUB_REPO_URL, header).then((repositories) => {
        console.log(repositories);
        var repo = repositories.data;

        for (var i = 0; repos.length > i; i++) {
            
            db.Repo.findOrCreate({
                where: {
                    UserId: repo[i].owner.id
                },
                defaults: {
                    title: repo[i].name,
                    description: repo[i].description,
                    share_status: repo[i].private
                }
            }).then(() => {
                res.status(200);
                console.log("Repos added");
            })
        }

    }).catch((err) => {
        console.log("Error pulling user repos");
        console.log(err);
        res.status(404);
    });
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