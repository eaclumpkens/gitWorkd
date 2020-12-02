var myRepos = ['gitWorkd', 'eaclumpkens', 'restaurantApp'];

var db = require("../models");
var axios = require("axios");

const consts = require("../utils/consts");

module.exports = function(app) {



    app.get("/api/user-repos", (req, res) =>  {

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
                };

                axios.get(consts.GITHUB_USER_URL, header).then((gitUser) => {
                    var username = gitUser.data.login;

                    for (var i = 0; i < myRepos.length; i++) {
                        var repo = myRepos[i];

                        var repoLink = `${consts.GITHUB_REPO_URL}/${username}/${repo}`;
                        var langLink = `${consts.GITHUB_LANG_URL}/${username}/${repo}`;

                        console.log(repoLink, langLink);
                    }
                });
                



            }).catch(err => console.log(err));
        }


    })

};