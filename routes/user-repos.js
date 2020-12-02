var myRepos = [];

var db = require("../models");
var axios = require("axios");

const consts = require("../utils/consts");

module.exports = function(app) {



    app.get("/profile", (req, res) =>  {

        if (req.cookies.uuid) {
            db.User.fineOne({
                where: {
                    cookie: req.cookies.uuid
                }
            }).then((loggedUser) => {

                var username;

                var header = {
                    headers: {
                        "Authorization": `token ${loggedUser.accessToken}`
                    }
                };

                axios.get(consts.GITHUB_USER_URL, header).then((gitUser) => {
                    username = gitUser.data.name;
                });

                console.log(username);

            })
        }


    })

};