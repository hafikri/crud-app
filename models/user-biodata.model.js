const {Model, DataTypes} = require('sequelize')
const sequelize = require('./sequelize')

class UserBiodata extends Model{}

Model.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jenis_kelamin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
            model: "user_game", key: "id",
            }
        }
    }, 
        {
            sequelize,
            tableName: "user_game_biodata",
            timestamps: false,
        }
);

module.exports = UserBiodata;