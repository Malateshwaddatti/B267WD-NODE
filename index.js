
//const { response } = require("express");
//const { request } = require("express");
import dotenv from "dotenv";
import express from "express";
import { response } from "express";
import { request } from "express";
import { MongoClient } from "mongodb";
//import dotenv from "dotenv";
//import {request} from express
//import { response } from  express
const app=express();
/*const users1=[{
    "createdAt": "2022-01-08T00:47:57.603Z",
    "name": "Velma Hoeger",
    "pic": "https://cdn.fakercloud.com/avatars/amayvs_128.jpg",
    "color": "teal",
    "age": 86,
    "id": "1"
   },
   {
    "createdAt": "2022-01-07T22:13:37.883Z",
    "name": "Myron Jenkins",
    "pic": "https://cdn.fakercloud.com/avatars/madebyvadim_128.jpg",
    "color": "color 8",
    "age": 92,
    "id": "2"
   },
   {
    "createdAt": "2022-01-07T19:40:02.041Z",
    "name": "Tammy Batz",
    "pic": "https://cdn.fakercloud.com/avatars/johannesneu_128.jpg",
    "color": "Red",
    "age": 74,
    "id": "3"
   },
   {
    "createdAt": "2022-01-08T05:59:23.901Z",
    "name": "Rosie Rodriguez",
    "pic": "https://cdn.fakercloud.com/avatars/guiiipontes_128.jpg",
    "color": "teal",
    "age": 78,
    "id": "4"
   },
   {
    "createdAt": "2022-01-08T10:42:31.252Z",
    "name": "Mrs. Josephine Roob",
    "pic": "https://cdn.fakercloud.com/avatars/psdesignuk_128.jpg",
    "color": "yellow",
    "age": 43,
    "id": "5"
   },
   {
    "createdAt": "2022-01-07T20:04:24.383Z",
    "name": "Woodrow Hane",
    "pic": "https://cdn.fakercloud.com/avatars/badlittleduck_128.jpg",
    "color": "teal",
    "age": 16,
    "id": "6"
   },
   {
    "createdAt": "2022-01-08T10:47:03.182Z",
    "name": "Betsy Gulgowski",
    "pic": "https://cdn.fakercloud.com/avatars/bermonpainter_128.jpg",
    "color": "Red",
    "age": 47,
    "id": "7"
   },
   {
    "createdAt": "2022-01-08T13:34:20.260Z",
    "name": "Angelina Jast",
    "pic": "https://cdn.fakercloud.com/avatars/pierrestoffe_128.jpg",
    "color": "teal",
    "age": 34,
    "id": "8"
   },
   {
    "createdAt": "2022-01-08T03:27:11.846Z",
    "name": "Roger Von I",
    "pic": "https://cdn.fakercloud.com/avatars/timmillwood_128.jpg",
    "color": "green",
    "age": 22,
    "id": "9"
   },

   {
    "createdAt": "2022-01-08T03:27:11.846Z",
    "name": "Bill gates",
    "pic": "https://cdn.fakercloud.com/avatars/timmillwood_128.jpg",
    "color": "white",
    "age": 82,
    "id": "10"
   }


];*/

dotenv.config();
const PORT=5000;
app.use(express.json());
console.log(process.env);
async function createConnection(){
    //const MONGO_URL="mongodb://localhost/users1";
   // const MONGO_URL="mongodb+srv://Malatesh:Guvi1234@cluster0.asaxd.mongodb.net/users1";
    const MONGO_URL=process.env.MONGO_URL;
    const client=new MongoClient(MONGO_URL);
    await client.connect;
    //const insertData= await client.db("users1").collection("people1").insertMany(users1);
    console.log("Successfully Connected !!!");
    
    return client;
    //const user= await client.db("users1").collection("people1").findOne({id:"7"})
    //console.log(user);
}

createConnection();

app.get("/",(request,response)=>{
    response.send("Hello World!!!");
});

app.get("/users1/:id",async(request,response)=>{
    const id=request.params.id;
    console.log(request.params);
    const client=await createConnection();
    const user=await client.db("users1").collection("people1").findOne({id:id});
    console.log(user);
    response.send(user);
    //response.send(users1.filter((user)=>user.id==id));
})

app.get("/users1", async (request,response)=>{
   // const{color,age}=request.query;
    //console.log(request.query.color,age);
   // response.send(users1.filter((user)=>user.color==color));
   const client= await createConnection();
   const user=await client.db("users1").collection("people1").find({}).toArray();
   console.log(user);
   response.send(user);
});

app.delete("/users1/:id",async(request,response)=>{
    
    console.log(request.params);
    const {id}=request.params;
    const client=await createConnection();
    const deleteData=request.body;
    const user= await client.db("users1").collection("people1").deleteOne({id:id});
    console.log(user,deleteData);
    response.send(user);

});

app.patch("/users1/:id",async(request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    const client=await createConnection();
    const newData=request.body;
    const user= await client.db("users1").collection("people1").updateOne({id:id},{$set:newData});
    console.log(newData,user);
    response.send(user);

})



/*app.get("/users1",(request,response)=>{
    const {color,age}=request.query;
    console.log(request.query.color,age); 

    if(!color && !age){
        response.send(users);
    }
    else if(color && !age){
        response.send(users.filter((user)=>user.color==color))
    }
    else if(!color && age){
        response.send(users.filter((user)=>user.age>=age))
}
else{
    response.send(users.filter((user)=>user.color==color && user.age>=age))
}
    //response.send(users.filter((user)=>user.color==color));
})*/

app.post("/users1",async (request,response)=>{
    const client= await createConnection();
    const addUser=request.body;
    const result=await client.db("users1").collection("people1").insertMany(addUser);
    console.log(addUser,result);
    response.send(result);
})





app.listen(PORT,()=>console.log("The server is started in :",PORT));