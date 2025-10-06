
import express, {Express} from "express" ;
import 'dotenv/config'

//const router = require('router')
import webRoutes from "./routes/web";

const app = express();
const port = process.env.PORT || 8080; 

//config view engine 
app.set('view engine', 'ejs') ;
app.set('views', __dirname + '/views');

//config route
webRoutes(app) ; 


app.listen(port, () => {
  console.log(`Running on port : ${port}`);

});
