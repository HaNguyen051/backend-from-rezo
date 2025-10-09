import { Request , Response } from "express";


const getDashboardPage = async (req : Request, res : Response) => {
        //data users

    // console.log(users) ;  
   // x <- y 
    return res.render("admin/dashboard/show")
 
}
const getAdminUserPage = async (req : Request, res : Response) => {
  
    return res.render("admin/user/show")
 
}
const getAdminProductPage = async (req : Request, res : Response) => {
      
    return res.render("admin/product/show")
 
}
const getAdminOrderPage = async (req : Request, res : Response) => {
   
    return res.render("admin/order/show")
 
}
export{getDashboardPage , getAdminUserPage , getAdminOrderPage , getAdminProductPage}