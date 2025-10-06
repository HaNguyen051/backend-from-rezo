//const express = require("express") ; //import express
import express from "express" ;

const app = express();//tạo express application
const port = 8080; //init port

//khai bao route thong qua url 
app.get("/", (req, res) => {
  res.send("Hello World! update");
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
});
