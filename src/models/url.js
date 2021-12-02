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
      // models.User.hasMany(models.Url, { foreignKey: 'userId' });
      // models.Url.belongsTo(models.User);
      // define association here
    }
    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined };
    }
  };
  Url.init(
    {
      longUrl: DataTypes.STRING,
      shortUrl: DataTypes.STRING,
      code: DataTypes.STRING,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'urls',
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