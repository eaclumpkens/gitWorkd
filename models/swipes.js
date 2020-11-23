module.exports = function(sequelize, DataTypes) {
    var Swipes = sequelize.define("Swipes", {
        match_rank: DataTypes.INTEGER,
        username: DataTypes.STRING,
        languages: DataTypes.TEXT,
        profile_URL: DataTypes.STRING
    });

    return Swipes;
};