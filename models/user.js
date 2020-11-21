module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // Giving the Author model a name of type STRING
        name: DataTypes.STRING,
        oAuth: DataTypes.STRING,
        cookie: DataTypes.STRING,
    });

    User.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        User.hasMany(models.Repo, {
            onDelete: "cascade"
        });
    };

    return User;
};