import { db } from "../connection.db.js"
export const users =[]
export const UserModel=await db.createCollection("Users")