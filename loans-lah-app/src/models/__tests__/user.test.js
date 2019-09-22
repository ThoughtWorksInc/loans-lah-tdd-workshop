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
  const user = await User.createUser("Alice", "1234")
  const retrieved = await User.findOne({ where: {name: "Alice"} })
  expect(user.id).toBe(retrieved.id)
  expect(retrieved.name).toBe("Alice")
})

test('password not stored in clear text', async () => {
  const user = await User.createUser("Alice", "1234")
  const retrieved = await User.findOne({ where: {name: "Alice"} })
  expect(user.id).toBe(retrieved.id)
  expect(retrieved.password).not.toBe("1234")
})

test('password verified correctly', async () => {
  const user = await User.createUser("Alice", "1234")
  const retrieved = await User.findOne({ where: {name: "Alice"} })
  expect(user.id).toBe(retrieved.id)
  expect(await retrieved.verifyPassword("abcd")).toBeFalsy()
  expect(await retrieved.verifyPassword("1234")).toBeTruthy()
})