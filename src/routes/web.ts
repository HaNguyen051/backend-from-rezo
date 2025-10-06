
import express, {Express} from "express" ;
const router = express.Router() 

const webRoutes = (app :Express) => {
    router.get("/", (req, res) => {
        res.render("home")
    
    });
    //src\views
    router.get("/abc", (req, res) => {
        res.send('<h1 style = "color : red">nodemon</h1>');
    });

    router.get("/hanguyen" , (req , res) =>{
        res.send("Hanguyen051 web")
    })
    app.use('/', router); 
}


export default webRoutes ; 