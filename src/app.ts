
import express, {Express} from "express" ;
import 'dotenv/config'
import { z } from "zod";
//const router = require('router')
import webRoutes from "./routes/web";
import initDatabase from "config/seed";
import passport from "passport";
import configPassportLocal from "./middleware/passport.local";
import session from "express-session";


const app = express();
const port = process.env.PORT || 8000; 

//config sesion
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
//config passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));
configPassportLocal();
//config view engine 
app.set('view engine', 'ejs') ;
app.set('views', __dirname + '/views');

//config req.body
app.use(express.json()); //su dang data duoi dang json (object)
app.use(express.urlencoded({ extended: true }));

//config static files : images / css /js
app.use(express.static('public')) ; 

//config route
webRoutes(app) ; 


//seeding data 
initDatabase(); 



app.use((req, res) => {
  return res.send("NOT FOUND 404"); 
})
app.listen(port, () => {
  console.log(`My app is running on port: ${port}`);

});
