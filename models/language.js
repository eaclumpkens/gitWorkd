module.exports = function(sequelize, DataTypes) {
    var Language = sequelize.define("Language", {
        name: DataTypes.STRING,
        percentage: DataTypes.INTEGER
    });


    Language.associate = function(models) {
        Language.belongsTo(models.Repo, {
            onDelete: null
        })

    };

    return Language;
}