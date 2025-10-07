
import express, {Express} from "express" ;
import { getCreateUserPage, getHomePage, getViewUserPage, postCreateUserPage, postDeleteUserPage, postUpdateUserPage } from "controllers/user.controller";
const router = express.Router() 

const webRoutes = (app :Express) => {
    router.get("/", getHomePage);
    //src\views
    router.get("/create-user", getCreateUserPage); 
    router.get("/handle-view-user/:id", getViewUserPage) ;
    //giong nhau url van ko van de j 
    router.post("/handle-create-user", postCreateUserPage);  
    router.post("/handle-delete-user/:id", postDeleteUserPage) ; 
    router.post("/handle-update-user", postUpdateUserPage ) ; 
    app.use('/', router); 
}


export default webRoutes ; 