import {Request , Response ,  NextFunction } from "express";


const isLogin = (req : Request , res : Response , next  :NextFunction) => {
    const isAuthen = req.isAuthenticated(); 
    if (isAuthen)
    {
        res.redirect("/");
    } else {
        next(); 
    }
}
const isAdmin = (req : Request , res : Response , next  :NextFunction) => {
    const user = req.user as any; 
    if (user?.Role?.name === "ADMIN") {
        res.redirect("/admin"); 
    }
    else res.redirect("/")
}
export { isLogin  , isAdmin}; 