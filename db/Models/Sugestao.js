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
            nick: { 
                type: DataTypes.STRING
            },
            servidor: { 
                type: DataTypes.STRING
            },
            sugestão: { 
                type: DataTypes.STRING
            },
            nick: { 
                type: DataTypes.INTEGER
            },
            comentario: { 
                type: DataTypes.STRING
            },
            status: {
                type: DataTypes.STRING
            }
            
        }, {
            tableName: 'Sugestões',
            timestamps: true,
            sequelize
        });
    }
}