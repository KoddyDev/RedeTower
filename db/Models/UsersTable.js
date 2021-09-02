const { DataTypes, Model } = require('sequelize');

module.exports = class Usuarios extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user: {
                type: DataTypes.STRING
            },
        }, {
            tableName: 'SugestõesUsers',
            timestamps: true,
            sequelize
        });
    }
}