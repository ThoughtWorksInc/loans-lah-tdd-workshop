import Sequelize from "sequelize"
import argon2 from "argon2"

const Model = Sequelize.Model;
export default class User extends Model {
  static async createUser(name, password){
    const hashedPassword = await argon2.hash(password, {type: argon2.argon2id})
    return User.create({
      name,
      password: hashedPassword
    })
  }

  async verifyPassword(test) {
    return await argon2.verify(this.password, test)
  }
}

export const _init = (sequelize) => {
  User.init({
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'user'
    // options
  })
}
