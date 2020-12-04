var path = require("path");
var db = require("../models");
var axios = require("axios");
const {
    v4: uuidv4
} = require('uuid');

var otherRepos = [];

var mockRepos = [
    {
        title: "Eat-Da-Burger",
        username: "nickelme",
        tech: "JavaScript, Handlebars, MySQL",
        compat: "100%",
        link: "https://www.google.com"
    },
    {
        title: "Note Taker",
        username: "eaclumpkens",
        tech: "JavaScript, Handlebars, MySQL",
        compat: "90%",
        link: "https://www.google.com"
    },
    {
        title: "Random Repo",
        username: "twkirkpatrick",
        tech: "JavaScript, Handlebars, MySQL",
        compat: "80%",
        link: "https://www.google.com"
    },
    
]

module.exports = function(app) {

    app.get("/main", (req, res) => {

        res.render("main-feed", {repos: mockRepos});
        // get current user
        if (req.cookies.uuid) {
            db.User.findOne({
                where: {
                    cookie: req.cookies.uuid
                }
            }).then((loggedUser) => {
                // pull userid
                var id = loggedUser.id;

                // pull NONE USER repos
                db.Repo.findAll({}).then((allRepos) => {

                    for (var i = 0; i < allRepos.length; i++) {
                        if (id !== allRepos[i].dataValues.UserId) {
                            otherRepos.push(allRepos[i].dataValues);
                        };
                    };

                    console.log(otherRepos);

                    // pull language keys 
                    // var keys = Object.keys(otherRepos[0]);
                    // var languages = [];

                    // for (var x = 0; x < keys.length; x++) {
                    //     if (keys[x] === 'id' || keys[x] === 'title' || keys[x] === 'description' || keys[x] === 'githubId' || keys[x] === 'createdAt' || keys[x] === 'updatedAt' || keys[x] === 'UserId') {
                    //         continue;
                    //     } else {
                    //         languages.push(keys[x]);
                    //     }
                    // };

                    // iterate through repos
                    for (var a = 0; a < otherRepos.length; a++) {

                        console.log(otherRepos[a]);




                        // iterate through language keys
                        // for (var b = 0; b < languages.length; b++) {

                        //     var language;
                        //     var repoScore;
                            
                        //     // iterate through repo lang bytes
                        //     Object.entries(otherRepos[a]).forEach(([key, value]) => {
                        //         if (key === languages[b]) {
                        //             if (value !== null) {
                                        
                        //                 language = languages[b];
                        //                 repoScore = value;
                        //             };
                        //         };
                        //     });


                        //     if (repoScore) {
                        //         console.log(`${language}: ${repoScore}`); 
                        //     };
                            
                        // }
    
    
                    };

                });   
            })

        }

        /* res.redirect("/"); */
    })


}