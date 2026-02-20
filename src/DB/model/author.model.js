import { db } from "../connection.db.js"
export const authors =[]
export const authorModel=await db.createCollection("author")