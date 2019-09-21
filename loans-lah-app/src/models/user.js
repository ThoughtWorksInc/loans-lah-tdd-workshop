import Sequelize from "sequelize"

const Model = Sequelize.Model;
export default class User extends Model {}

export const _init = (sequelize) => {
    User.init({
    // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
    }, {
    sequelize,
    modelName: 'user'
    // options
    })
}