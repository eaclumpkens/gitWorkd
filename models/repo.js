module.exports = function(sequelize, DataTypes) {
    var Repo = sequelize.define("Repo", {
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
        }
    });

    Repo.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Repo.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        // Associates languages used in repo
        Repo.hasMany(models.Language, {
                onDelete: "cascade"
        });
    };

    return Repo;
};