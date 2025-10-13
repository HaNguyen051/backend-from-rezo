
import express, {Express} from "express" ;
import { getCreateUserPage, getHomePage, getViewUserPage, postCreateUserPage, postDeleteUserPage, postUpdateUserPage } from "controllers/user.controller";
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";
import { getProductPage} from "controllers/client/product.controller";
import { getCreateProductPage, postCreateProductPage } from "controllers/admin/product.controller";
const router = express.Router() 
const webRoutes = (app :Express) => {
    //src\views
    //client route
    router.get("/", getHomePage);
    router.get("/product/:id", getProductPage);
   






    //giong nhau url van ko van de j  
    router.post("admin/update-user", postUpdateUserPage); 
    //admin routes
    router.get("/admin", getDashboardPage);
    //user
    router.get("/admin/user", getAdminUserPage);
    router.get("/admin/create-user", getCreateUserPage); 
    router.post("/admin/handle-create-user", fileUploadMiddleware('avatar'), postCreateUserPage); 
    router.post("/admin/delete-user/:id", postDeleteUserPage);
    router.get("/admin/view-user/:id", getViewUserPage);
    router.post("/admin/update-user",  fileUploadMiddleware('avatar'),postUpdateUserPage); 
   

    
    router.get("/admin/order", getAdminOrderPage);

    //product
    router.get("/admin/create-product" , getCreateProductPage)
    router.get("/admin/product", getAdminProductPage);
    router.post("/admin/handle-create-product", fileUploadMiddleware('image' , "images/product"), postCreateProductPage); 


  

    app.use('/', router); 
}


export default webRoutes ; 