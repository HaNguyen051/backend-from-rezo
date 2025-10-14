import {Request , Response ,  NextFunction } from "express";



const isAdmin = (req : Request , res : Response , next  :NextFunction) => {
    
   //apply only to admin
    if(req.path.startsWith('/admin'))
    {   const user = req.user; 
        if (user?.Role?.name === "ADMIN") {
        next(); 
        }
        else res.render("status/403.ejs")
        return; 
    }
    //client routes
    next(); 
}
export {isAdmin}; 