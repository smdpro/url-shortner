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
    static associate({ Url }) {
      this.hasMany(Url, { foreignKey: 'userId', as: 'urls' });
      // models.Url.belongsTo(models.User);
    }
    generateAuthToken = function () {
      return jwt.sign({ id: this.uuid }, process.env.JWT_PRIVATE_KEY);
    };
    validPassword = function (password) {
      let hash = crypto
        .pbkdf2Sync(password, this.userName, 1000, 64, `sha512`)
        .toString(`hex`);
      return this.password === hash;
    };
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  );
  User.beforeCreate(async (user, options) => {
    // user.uuid=
    user.password = crypto
      .pbkdf2Sync(user.password, user.userName, 1000, 64, `sha512`)
      .toString(`hex`);
    user.createdAt = new Date();
    user.updatedAt = new Date();
  });
  
  return User;
};
