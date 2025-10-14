import {Request , Response ,  NextFunction } from "express";


const isLogin = (req : Request , res : Response , next  :NextFunction) => {
    const isAuthen = req.isAuthenticated(); 
    if (isAuthen)
    {
        res.redirect("/");
        return; 
    } else {
        next(); 
    }
}
const isAdmin = (req : Request , res : Response , next  :NextFunction) => {
    
    const user = req.user; 
    if (user?.Role?.name === "ADMIN") {
        next(); 
    }
    else res.redirect("/")
}
export { isLogin  , isAdmin}; 