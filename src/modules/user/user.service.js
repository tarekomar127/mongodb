import { ObjectId } from 'mongodb'
import {UserModel, users} from '../../DB/model/index.js'

export const profile=async (id)=>{
    const user = await UserModel.findOne({_id:ObjectId.createFromHexString(id)})
     if(!user){
    throw new Error(" invailed account id ",{cause:{status:404}})
    }
    return user
}
export const allusers=async (id)=>{
    const users = await UserModel.find({}).toArray()
     if(!users){
    throw new Error(" invailed account id ",{cause:{status:404}})
    }
    return users
}
export const updateProfile = async (id, { DOB, gender }) => {
  const user = await UserModel.updateOne( { _id: ObjectId.createFromHexString(id) },{ $set: { DOB, gender } }
  )

  if (!user.matchedCount) {
    throw new Error("Invalid account Id", { cause: { status: 404 } })
  }

  return user
}
export const deleteProfile = async (id) => {
  const user = await UserModel.deleteOne({ _id: ObjectId.createFromHexString(id)})

  if (!user.deletedCount) {
    throw new Error("Invalid account Id", { cause: { status: 404 } })
  }

  return user
}

