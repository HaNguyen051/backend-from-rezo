import { Request , Response } from "express";
import { getAllRoles, getAllUsers, getUserById, handleCreateUser, handleDeleteUser, handleUpdateUser } from "services/user.service";

//get admin user create 
const getCreateUserPage =async (req: Request, res: Response) => {
    const roles = await getAllRoles(); 

    return res.render("admin/user/create.ejs", {
        roles ,
    }) ; 
}


const postCreateUserPage = async (req :Request , res : Response) => {
    //object destructuring
    const {fullname , username , phone , role , address} = req.body ; 
    //handle create user
    // const a = await handleCreateUser(fullname , email , address) ; 
    
    return res.redirect("/admin") ; 
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
    const  a = await handleUpdateUser(fullname, email, address, id); 
    return res.redirect("/") ; 
}
export { getCreateUserPage , postCreateUserPage , postDeleteUserPage , getViewUserPage , postUpdateUserPage } ; 