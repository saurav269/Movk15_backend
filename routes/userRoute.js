const express = require("express");
const userRouter  = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Model/userModel");

userRouter.get("/",(req,res)=>{
 res.send("user")

})


userRouter.post("/signup",async(req,res)=>{
const {email,password} = req.body
try{
bcrypt.hash(password,5,async(err,secured_password)=>{

if(err){

  res.send({"msg":"something get wrong"})  
}else{
    const post = new UserModel({email,password:secured_password})
    await post.save()
    res.send({"msg":"User registered Successfully"})
}})


}catch(err){
    res.send({"msg":"something get wrong"})  

}})

userRouter.post("/login",async(req,res)=>{

const {email,password} = (req.body)
const id = req.params.id

try{
const user = await UserModel.find({email})
if(user.length>0){
bcrypt.compare(password,user[0].password,async(err,result)=>{

if(result){
let token = jwt.sign({userID: user[0]._id},"sau")
res.send({"message":"Logged in successfull", "token":token})

}else{
    res.send({"message":"Wrong Credentials"})  
}})

}else{
    res.send({"message":"Wrong Credentials"})
}}

catch(err){

    res.send({"message":"Can't login"})
    console.log(err)

}})

   module.exports={
    userRouter
   }