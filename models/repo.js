var fs = require("fs");
var path = require("path");
const {
    col
} = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    var colData = {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        share_status: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    };

    var langs = fs.readFileSync("./languages.txt", {
        encoding: 'utf8',
        flag: 'r'
    });
    var langarray = langs.split("\n");

    for (var i = 0; i < langarray.length; i++) {
        var lang = langarray[i];
        if (lang == "") {
            continue;
        }
        colData[lang] = {
            type: DataTypes.DECIMAL(3, 2),
            allowNull: false,
            default: 0
        }
    }


    var Repo = sequelize.define("Repo", colData);

    Repo.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Repo.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Repo;
};