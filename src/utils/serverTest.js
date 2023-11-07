const supertest=require("supertest")
const express=require("express")

function serverTest(route){
    const app=express()
    route(app)
    return app
}

module.exports=serverTest