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

                console.log(loggedUser);
                if (loggedUser) {

                    axios.get(consts.GITHUB_REPO_URL, {
                        params: {

                        }
                    })
                }

            });
        } else {
            //TODO REDIRECT TO MAIN
        }
    });
}