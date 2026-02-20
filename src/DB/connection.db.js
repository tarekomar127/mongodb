import { MongoClient } from 'mongodb'
import{DB_NAME, DB_url}from'../../config/config.service.js'
const client = new MongoClient(DB_url);
export const db =client.db(DB_NAME)
export const authntcationDB=async()=>{
    try {
        await client.connect();
        console.log("connect")
    } catch (error) {
         console.log(`Not connect ${error}`)
    }
}