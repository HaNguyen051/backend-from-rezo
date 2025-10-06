//const express = require("express") ; //import express
import express from "express" ;
import 'dotenv/config'

const app = express();//tạo express application
const port = process.env.PORT || 8080; //init port

//khai bao route thong qua url 
app.get("/", (req, res) => {
  res.send("Hello World with nodemon");
});
app.get("/abc", (req, res) => {
  res.send("Get ABC");
});

app.get("/hanguyen" , (req , res) =>{
  res.send("Hanguyen051")
})

//thuc hien tien trinh thong qua port
//nap thon tin khai bao o tren r chay
app.listen(port, () => {
  console.log(`Running on port : ${port}`);
  // console.log("env port :" , process.env.PORT)
});
