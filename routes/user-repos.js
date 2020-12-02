var myRepos = ['gitWorkd', 'eaclumpkens', 'restaurantApp'];

var path = require("path");
var db = require("../models");
var axios = require("axios");
const {
    v4: uuidv4
} = require('uuid');

const consts = require("../utils/consts");

module.exports = function(app) {

    app.get("/api/user-repos", (req, res) =>  {

        if (req.cookies.uuid) {
            db.User.findOne({
                where: {
                    cookie: req.cookies.uuid
                }
            }).then((loggedUser) => {

                axios.get(consts.GITHUB_USER_URL, {
                    headers: {
                        "Authorization": `token ${loggedUser.accessToken}`
                    }
                }).then((gitUser) => {
                    var username = gitUser.data.login;
                    console.log(username)
                    for (var i = 0; i < myRepos.length; i++) {
                        var repo = myRepos[i];

                        var repoLink = `${consts.GITHUB_REPO_URL}/${username}/${repo}`;
                        var langLink = `${consts.GITHUB_LANG_URL}/${username}/${repo}`;

                        console.log(repoLink, langLink);
                    }
                }).catch(err => console.log(err.response));
                



            }).catch(err => console.log(err.response));
        }


    })

};