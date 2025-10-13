import { Request , Response } from "express";
import { getAllUsers } from "services/admin/user.service";


const getDashboardPage = async (req : Request, res : Response) => {
    return res.render("admin/dashboard/show")
 
}
const getAdminUserPage = async (req : Request, res : Response) => {
   const users = await getAllUsers() ; 
    return res.render("admin/user/show.ejs" ,  {
        users: users , 
    })
 
}

const getAdminOrderPage = async (req : Request, res : Response) => {
   
    return res.render("admin/order/show")
 
}
export{getDashboardPage , getAdminUserPage , getAdminOrderPage }