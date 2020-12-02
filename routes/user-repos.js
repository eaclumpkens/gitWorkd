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

                async function userPull() {
                    return axios.get(consts.GITHUB_USER_URL, header).then(gitUser => gitUser.data.login);
                }

                userPull().then(username => {

                    for (var i = 0; i < myRepos.length; i ++) {
                        var repo = myRepos[i];
                        var langLink = `${consts.GITHUB_LANG_URL}/${username}/${repo}/languages`;
                        var repoLink = `${consts.GITHUB_REPO_URL}/${repo}`;

                        async function repoPull() {
                            return axios.get(repoLink).then(repoData => repoData.data);
                        }

                        async function langPull() {
                            return axios.get(langLink).then(languages => languages.data);
                        };

                        repoPull().then((repoData) => {
                            console.log(repoData.data);
                        })     
                            
                    }

                });

            });
        }


    })

};