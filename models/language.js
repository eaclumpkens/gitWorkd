module.exports = function(sequelize, DataTypes) {
    var Language = sequelize.define("Language", {
        name: DataTypes.STRING,
        percentage: DataTypes.INTEGER
    });

    return Language;
}