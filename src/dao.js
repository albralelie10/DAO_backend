
 const getUsers=async()=>{
    try{
        const response=await fetch("https://jsonplaceholder.typicode.com/users")
        const users=await response.json()
        return users
    }catch(err){
        throw err
    }
}

 const getOne=async(req)=>{
    try{
        const {id}=req.params
        const response=await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        const user=await response.json()
        return user
    }catch(err){
        throw err
    }
}
module.exports={
    getUsers,getOne
}