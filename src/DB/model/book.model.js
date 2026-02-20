import { db } from "../connection.db.js"
export const books =[]
export const bookModel=await db.createCollection("books")