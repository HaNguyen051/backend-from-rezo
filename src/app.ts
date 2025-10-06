
import express from "express" ;
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 8080; 


app.get("/", (req, res) => {
  res.send("<h1>Hello World with nodemon</h1>");
 
});
app.get("/abc", (req, res) => {
   res.send('<h1 style = "color : red">nodemon</h1>');
});

app.get("/hanguyen" , (req , res) =>{
  res.send("Hanguyen051")
})


app.listen(port, () => {
  console.log(`Running on port : ${port}`);

});
