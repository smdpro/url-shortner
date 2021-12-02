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
    static associate({User}) {
      // models.User.hasMany(models.Url, { foreignKey: 'userId' });
       this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      // define association here
    }
    toJSON() {
      return {
        ...this.get(),
        uuid: undefined,
        userId: undefined,
        createdAt: undefined,
        updatedAt:undefined,
      };
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
      modelName: 'Url',
      tableName: 'urls',
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