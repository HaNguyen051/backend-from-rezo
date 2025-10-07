import { Request , Response } from "express";
import { getAllUsers, getUserById, handleCreateUser, handleDeleteUser, handleUpdateUser } from "services/user.service";

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
const postDeleteUserPage = async (req :Request , res : Response) => {
   
    const { id } = req.params;  
    await handleDeleteUser(id); 
     return res.redirect("/") ; 
}
const getViewUserPage = async (req :Request , res : Response) => {
    const { id } = req.params; 
    //get user by id 
    const user =  await getUserById(id); 

    return res.render("view-user", {
        id: id , 
        user : user 
    }); 
}
const postUpdateUserPage = async (req :Request , res : Response) => {
    //object destructuring
    const { id , fullname , email , address } = req.body;  
    await handleUpdateUser(id, email, address, fullname); 
    return res.redirect("/") ; 
}
export {getHomePage , getCreateUserPage , postCreateUserPage , postDeleteUserPage , getViewUserPage , postUpdateUserPage } ; 