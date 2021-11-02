const sequelize = require('./sequelize');
const {Model, DataTypes}= require('sequelize');

class User extends Model{}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull:false,
        }
    },
    {
        sequelize,
        tableName: 'user_game',
        timestamps: false
    }
)

module.exports = User;