import { Router } from "express";
import { allusers, deleteProfile, profile, updateProfile } from "./user.service.js";
const router=Router()

router.get("/:userid" ,async (req,res,next)=>{
    const result  =await profile(req.params.userid)
    return res.status(200).json({message:"Profile" , result})
})

router.get("/" ,async (req,res,next)=>{
    const result  =await allusers()
    return res.status(200).json({message:"done all users" , result})
})
router.patch("/:userid" ,async (req,res,next)=>{
    const result  =await updateProfile(req.params.userid,req.body)
    return res.status(200).json({message:"done updata user" , result})
})
router.delete("/:userid" ,async (req,res,next)=>{
    const result  =await deleteProfile(req.params.userid)
    return res.status(200).json({message:"done delete user " , result})
})
export default router