
var db = require("../models");

var userRepos = [];
var similarRepos = [];

module.exports = function(app) {

    app.get("/main", (req, res) => {

        if (req.cookies.uuid) {

            db.User.findOne({
                where: {
                    cookie: req.cookies.uuid
                }
            }).then((loggedUser) => {

                var git = loggedUser.githubId;
                console.log(git);

            })

        }
    
        res.redirect("/");
    })


}