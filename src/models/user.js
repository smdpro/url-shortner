'use strict';
const { Model } = require('sequelize');
const jwt = require('jsonwebtoken');
var crypto = require('crypto');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.User.hasMany(models.Url, { foreignKey: 'userId' });
      // models.Url.belongsTo(models.User);
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUID4,
      },
      name: DataTypes.STRING,
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'users',
      instanceMethods: {
        generateAuthToken: function () {
          return jwt.sign({ id: this.uuid }, process.env.JWT_PRIVATE_KEY);
        },
        validPassword: function (password) {
          let hash = crypto
            .pbkdf2Sync(password, this.uuid, 1000, 64, `sha512`)
            .toString(`hex`);
          return this.password === hash;
        },
      },
    }
  );
  User.beforeCreate(async (user, options) => {
    user.password = crypto
      .pbkdf2Sync(user.password, user.uuid, 1000, 64, `sha512`)
      .toString(`hex`);

  });
  return User;
};
