
var db = require("../models");

var myRepos = [];
var similarRepos = [];

module.exports = function(app) {

    app.get("/main", (req, res) => {

        if (req.cookies.uuid) {

            db.User.findOne({
                where: {
                    cookie: req.cookies.uuid
                }
            }).then((loggedUser) => {

                var id = loggedUser.id;
                
                db.Repos.findEach({
                    where: {
                        UserId: id
                    }
                }).then((userRepos) => {

                    myRepos.push(userRepos);
                    console.log(myRepos);

                })

            })

        }
    
        res.redirect("/");
    })


}


