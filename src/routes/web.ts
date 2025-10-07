
import express, {Express} from "express" ;
import { getCreateUserPage, getHomePage, postCreateUserPage } from "../controllers/user.controller";
const router = express.Router() 

const webRoutes = (app :Express) => {
    router.get("/", getHomePage);
    //src\views
    router.get("/create-user", getCreateUserPage) ; 
    //giong nhau url van ko van de j 
    router.post("/handle-create-user", postCreateUserPage) ; 

    app.use('/', router); 
}


export default webRoutes ; 