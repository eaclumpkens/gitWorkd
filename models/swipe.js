module.exports = function(sequelize, DataTypes) {

    // Repo-to-Repo  Compatability Score
    var Swipe = sequelize.define("Swipe", {
        match_score: DataTypes.INTEGER,
    });

    // Compatable Repository w/ FK to Repo

    return Swipe;
};