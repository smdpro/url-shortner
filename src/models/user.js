'use strict';
const {
  Model
} = require('sequelize');
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
      // define association here
    }
  };
  User.init(
    {
      name: DataTypes.STRING,
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      instanceMethods: {
        generateAuthToken: function () {
          return jwt.sign(
            { userName: this.userName },
            process.env.JWT_PRIVATE_KEY
          );
        },
        validPassword: function (password) {
         var hash = crypto
           .pbkdf2Sync(password, this.userName, 1000, 64, `sha512`)
           .toString(`hex`);
         return this.password === hash; 
        },
      },
    }
  );
  User.beforeCreate(async (user, options) => {
    user.password = crypto
      .pbkdf2Sync(user.password, user.userName, 1000, 64, `sha512`)
      .toString(`hex`); 
    
  });
  return User;
};