'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Url extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Url);
      models.Url.belongsTo(models.User);
      // define association here
    }
  };
  Url.init(
    {
      longUrl: DataTypes.STRING,
      shortUrl: DataTypes.STRING,
      code: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Url',
      indexes: [
        {
          unique: true,
          fields: ['code'],
        },
      ],
    }
  );
  return Url;
};