var myRepos = [];

var db = require("../models");
var axios = require("axios");

const consts = require("../utils/consts");

module.exports = function(app) {



    app.get("/profile", (req, res) =>  {

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

                async function userPull() {
                    return axios.get(consts.GITHUB_USER_URL, header).then(gitUser => gitUser.data.login);
                }

                userPull().then(username => {

                    var repo = 'gitWorkd'
                    var repoLink = `${consts.GITHUB_LANG_URL}/${username}/${repo}/languages`;

                    console.log(repoLink);


                });

            });
        }


    })

};