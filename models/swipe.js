module.exports = function(sequelize, DataTypes) {
    var Swipe = sequelize.define("Swipe", {
        match_percent: DataTypes.INTEGER
    });


    Swipe.associate = function(models) {

        Swipe.hasOne(models.User, {
            onDelete: null
        });
    }

    return Swipe;
};