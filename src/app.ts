
import express, {Express} from "express" ;
import 'dotenv/config'
import { z } from "zod";
//const router = require('router')
import webRoutes from "./routes/web";
import initDatabase from "config/seed";
import passport from "passport";
import configPassportLocal from "./middleware/passport.local";
import session from "express-session";
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');


const app = express();
const port = process.env.PORT || 8000; 

//config sesion
app.use(session({
  cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
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
