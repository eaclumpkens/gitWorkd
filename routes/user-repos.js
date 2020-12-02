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

                var username = axios.get(consts.GITHUB_USER_URL, header).then(gitUser => gitUser.data.login);
                

                console.log(username);

            });
        }


    })

};