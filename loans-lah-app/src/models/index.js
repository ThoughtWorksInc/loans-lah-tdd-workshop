import Sequelize from "sequelize"
import User, { _init as userInit } from "./user"

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async () => {

  const dbName = process.env.DB_NAME
  const dbUser = process.env.DB_USER
  const dbPassword = process.env.DB_PASSWORD
  const dbHost = process.env.DB_HOST

  const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'postgres'
  });
  let connected = false;
  while (!connected) {
    try{
      await sequelize.authenticate()
      console.log("connected to db!")
      connected = true
    } catch {
      console.log("waiting for db...")
      await sleep(1000)
    }
  }
  userInit(sequelize)
  await User.sync()
}
