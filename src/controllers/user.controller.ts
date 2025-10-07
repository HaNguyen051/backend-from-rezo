import { Request , Response } from "express";
import { getAllUsers, handleCreateUser } from "../services/user.service";

const getHomePage = async (req : Request, res : Response) => {
        //data users
    const users = await getAllUsers() ; 
    // console.log(users) ;  
   // x <- y 
    return res.render("home" , {
        users : users
    }) ;
}



const getCreateUserPage = (req :Request , res : Response) => {
    return res.render("create-user") ; 
}
const postCreateUserPage = async (req :Request , res : Response) => {
    //object destructuring
    const {fullname , email , address} = req.body ; 
    //handle create user
    await handleCreateUser(fullname , email , address) ; 
    
    return res.redirect("/") ; 
}
export {getHomePage , getCreateUserPage , postCreateUserPage} ; 