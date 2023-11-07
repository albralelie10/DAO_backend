const express=require("express")
const {getUsers,getOne}=require("../dao.js")
const {getAllUsers,getOneUser} =require("./user.handler.js")
const userRouter=express.Router()

//getall
userRouter.route("/").get(getAllUsers);

userRouter.route("/:id").get(getOneUser);

module.exports=(app)=>app.use("/users",userRouter)





