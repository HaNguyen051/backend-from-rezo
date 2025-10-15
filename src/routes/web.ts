
import express, {Express} from "express" ;
import { getCreateUserPage, getHomePage, getViewUserPage, postCreateUserPage, postDeleteUserPage, postUpdateUserPage } from "controllers/user.controller";
import { getAdminOrderPage, getAdminUserPage, getDashboardPage } from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";
import { getCartPage, getProductPage, postAddProductToCart} from "controllers/client/product.controller";
import { getAdminProductPage, getCreateProductPage, getViewProduct, postCreateProductPage, postDeleteProductPage, postUpdateProductPage } from "controllers/admin/product.controller";
import { getLoginPage, getRegisterPage, getSuccessRedirectPage, postLogout, postRegister } from "controllers/client/auth.controller";
import passport from "passport";
import { isAdmin} from "src/middleware/auth";
const router = express.Router() 
const webRoutes = (app :Express) => {
    //src\views
    //client route
    router.get("/", getHomePage);
    router.get("/product/:id", getProductPage);
    router.get("/login", getLoginPage); 
    router.get("/register", getRegisterPage); 
    router.post("/register", postRegister); 
    //phan quyen
    router.get("/success-redirect", getSuccessRedirectPage)
    router.post('/login/', passport.authenticate('local', {
        successReturnToOrRedirect: '/success-redirect',
        failureRedirect: '/login',
        failureMessage: true
    }));

    router.post('/add-product-to-cart/:id' , postAddProductToCart)
    router.get("/cart", getCartPage) 




    //giong nhau url van ko van de j  
    //admin routes
    router.get("/admin",getDashboardPage);
    //user
    router.get("/admin/user", getAdminUserPage);
    router.get("/admin/create-user", getCreateUserPage); 
    router.post("/admin/handle-create-user", fileUploadMiddleware('avatar'), postCreateUserPage); 
    router.post("/admin/delete-user/:id", postDeleteUserPage);
    router.get("/admin/view-user/:id", getViewUserPage);
    router.post("/admin/update-user",  fileUploadMiddleware('avatar'),postUpdateUserPage); 
     router.post("/logout", postLogout);

    
    router.get("/admin/order", getAdminOrderPage);

    //product
    router.get("/admin/create-product" , getCreateProductPage)
    router.get("/admin/product", getAdminProductPage);
    router.post("/admin/handle-create-product", fileUploadMiddleware('image' , "images/product"), postCreateProductPage); 
    router.get("/admin/view-product/:id", getViewProduct); 
    router.post("/admin/delete-product/:id", postDeleteProductPage); 
    router.post("/admin/update-product", fileUploadMiddleware('image' , "images/product"), postUpdateProductPage); 
  

    app.use('/', isAdmin , router); 
}


export default webRoutes ; 