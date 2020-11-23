module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        accessToken: DataTypes.STRING,
        githubId: DataTypes.BIGINT,
        cookie: DataTypes.STRING,
    });

    User.associate = function(models) {
        User.hasMany(models.Repo, {
            onDelete: "cascade"
        });
    };

    return User;
};