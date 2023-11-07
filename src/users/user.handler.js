//controllers
const {getUsers,getOne}=require("../dao")

async function getAllUsers(req,res){
    try{
        const users= await getUsers() 
        if(users.length<1)return res.status(404).json({msg:"The collection is empty"})
        return res.json(users)
    }catch(err){
        return res.status(500).json(err.message)
    }
}

 async function getOneUser(req,res){
    try{
        const user =await getOne(req)
        if(!user)return res.status(404).json(user)
        return res.status(200).json(user)    
    }catch(err){
        return res.status(500).json(err.message)
    }
}
module.exports={
    getAllUsers,
    getOneUser
}