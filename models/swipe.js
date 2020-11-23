module.exports = function(sequelize, DataTypes) {

    // User-to-User Compatability Score
    var Swipe = sequelize.define("Swipe", {
        match_score: DataTypes.INTEGER
    });

    // Compatable Repository w/ FK to User
    Swipe.associate = function(models) {
        Swipe.hasOne(models.Repo, {
            onDelete: null
        });
    }
 
    return Swipe;
};