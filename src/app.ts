
import express from "express" ;
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 8080; 

//config view engine 
 app.set('view engine', 'ejs') ;
app.set('views', __dirname + '/views');

app.get("/", (req, res) => {
  res.render("home")
 
});
//src\views
app.get("/abc", (req, res) => {
   res.send('<h1 style = "color : red">nodemon</h1>');
});

app.get("/hanguyen" , (req , res) =>{
  res.send("Hanguyen051")
})


app.listen(port, () => {
  console.log(`Running on port : ${port}`);

});
