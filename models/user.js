var fs = require("fs");

module.exports = function(sequelize, DataTypes) {

    var colData = {
        accessToken: DataTypes.STRING,
        githubId: DataTypes.BIGINT,
        cookie: DataTypes.STRING,
        cookieCreated: DataTypes.DATE
    }

    var langs = fs.readFileSync("./languages.txt", {
        encoding: 'utf8',
        flag: 'r'
    });

    var langarray = langs.split("\n");

    for (var i = 0; i < langarray.length; i++) {
        var lang = langarray[i];
        lang = lang.replace(/\./g, "_");
        if (lang == "") {
            continue;
        }
        colData[lang] = {
            type: DataTypes.DECIMAL(3, 2),
            allowNull: true,
            default: 0
        }
    }

    var User = sequelize.define("User", colData);

    User.associate = function(models) {
        User.hasMany(models.Repo, {
            onDelete: "cascade"
        });
    };

    return User;
};