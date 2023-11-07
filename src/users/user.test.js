const users=require("./user.router")
const request=require("supertest")
const serverTest=require("../utils/serverTest")

const app=serverTest(users) //server Test

jest.mock("../dao.js")

// jest.mock("../dao.js",()=>({
//     getUsers:jest.fn(()=>[
//         {id:1, name:"NOEMI",email:"noemi@test.com"},
//         {id:2, name:"DELDRIMA",email:"deldrima@test.com"}

//     ]),
//     getOne:jest.fn(()=>({
//         name:"CHIO",
//         email:"chio@test.com",
//         id:1
//     }))
// }))//MOCK DAO 


describe("GET .src/users",()=>{
    //status 200
    test("expect a response with 200 status code",async()=>{
        const expected=200
        let getUsers= require("../dao").getUsers
        getUsers.mockResolvedValue([
            {id:1, name:"NOEMI",email:"noemi@test.com"},
            {id:2, name:"DELDRIMA",email:"deldrima@test.com"}

        ])
        //arrange//preparar lo esperado
       //act 
       return request(app)
       .get("/users")
       .set("Accept","application/json")
       .expect("Content-Type",/json/) 
       .then(res=>{
       //assert 
           expect(res.statusCode).toEqual(expected)
       })
    })
    //get list of users
    test("expect return a array of users ",async()=>{
        const getUsers=require("../dao").getUsers
        getUsers.mockResolvedValue([
            {name:"NOEMI",email:"noemi@test.com",id:1},
            {name:"DELDRIMA",email:"deldrima@test.com",id:2}
        ])
    
        return request(app)
        .get("/users")
        .set("Accept","application/json")
        .then(res=>{
            expect(res.body).toHaveProperty("length")
            expect(res.body.length).toBeGreaterThan(0)
            expect(res.body[0].name).toEqual("NOEMI")
            res.body.forEach(item=>{
                expect(item).toHaveProperty("name")
                expect(item).toHaveProperty("email")
                expect(item).toHaveProperty("id")

            })
        })
    })
     //server Error
     test("should return a error with the status 500",async()=>{
        let getUsers= require("../dao").getUsers
        const errorMsg=new Error("Error al obtener usuarios")
        getUsers.mockRejectedValue(errorMsg)
        
        return request(app)
        .get("/users")
        .set("Accept","application/json")
        .expect("Content-Type",/json/)
        .then(res=>{
            expect(res.statusCode).toEqual(500)
            console.log(res.body)
            expect(res.body).toEqual("Error al obtener usuarios")
        })
     }) 
     //array empty 
    test("expect to handle an empty user array", async () => {
        // Mock la función getUsers para devolver un array vacío
        const getUsers=require("../dao").getUsers
        getUsers.mockResolvedValue(new Array())
        //Act
        const response = await request(app)
          .get("/users")
          .set("Accept", "application/json");
        console.log(response.body)
        // Assert
        expect(response.statusCode).toEqual(404); // Esperamos un código de estado 404
        expect(response.body).toHaveProperty("msg")
        expect(response.body.msg).toEqual("The collection is empty")
      });
})

// describe("GET /users/:id",()=>{
//     test("should return a response with status code 200",async()=>{
//         const expected=200
//         return request(app)
//                 .get("/users/1")
//                 .set("Accept","application/json")
//                 .then(res=>{
//                     expect(res.statusCode).toEqual(expected)
//                 })}        
//     )
//     test("shoul return one element of user",()=>
//         request(app)
//         .get("/users/122")
//         .set("Accept","application/json")
//         .expect("Content-Type",/json/)
//         .then(res=>{
//             expect(res.statusCode).toEqual(200)
//             expect(res.body).toHaveProperty("name")
//             expect(res.body.name).toEqual("CHIO")
//         })
//     )    
// })




