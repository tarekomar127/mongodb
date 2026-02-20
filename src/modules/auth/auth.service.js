import { UserModel } from "../../DB/model/user.model.js"

export const signup = async (inputs) => {
    const{email,password,fullName}=inputs
    const checkaccount=await UserModel.findOne({email});
    if(checkaccount){
   throw new Error("email exist",{cause:{status:409}})
    }
    const user=await UserModel.insertOne({email,password,fullName})
    return user
}

export const login = async (inputs) => {
    const{email,password}=inputs
    const user=await UserModel.insertOne({email,password})
    if(!user){
    throw new Error(" invailed login data ",{cause:{status:404}})
    }
    return user
}
