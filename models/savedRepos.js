module.exports = function(sequelize, DataTypes) {
    var colData = {};



    var Repo = sequelize.define("SavedRepos", colData);

    Repo.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Repo.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        Repo.belongsTo(models.Repo, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Repo;
};