
import express, {Express} from "express" ;
import { getCreateUserPage, getViewUserPage, postCreateUserPage, postDeleteUserPage, postUpdateUserPage } from "controllers/user.controller";
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";
const router = express.Router() 
const webRoutes = (app :Express) => {
    //src\views
 
    //giong nhau url van ko van de j  
    router.post("/handle-update-user", postUpdateUserPage); 
    
    //admin routes
    router.get("/admin", getDashboardPage);
    //user
    router.get("/admin/user", getAdminUserPage);
    router.get("/admin/create-user", getCreateUserPage); 
    router.post("/admin/handle-create-user", fileUploadMiddleware('avatar'), postCreateUserPage); 
    router.post("/admin/delete-user/:id", postDeleteUserPage);
    router.get("/admin/view-user/:id", getViewUserPage) ;
   
   
    
    
    router.get("/admin/order", getAdminOrderPage);
    
    router.get("/admin/product", getAdminProductPage);

    app.use('/', router); 
}


export default webRoutes ; 