import { db } from "../connection.db.js"
export const logs =[]
export const logModel=await db.createCollection("logs")