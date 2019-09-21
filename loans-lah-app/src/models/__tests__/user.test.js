import Sequelize from "sequelize"
import User, { _init as userInit } from "../user"

let sequelize
beforeEach(async () => {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:'
  })
  await sequelize.authenticate()
  userInit(sequelize)
  await User.sync()
})
afterEach(async () => {
  await sequelize.close()
})

test('saves the user', async () => {
  const user = await User.create({name: "Alice"})
  const retrieved = await User.findOne({ where: {name: "Alice"} })
  expect(user.id).toBe(retrieved.id)
  expect(retrieved.name).toBe("Alice")
})