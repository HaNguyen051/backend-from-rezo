import { Request, Response } from "express";
import { handleCreateProduct } from "services/product.service";


const getCreateProductPage =async (req: Request, res: Response) => {

    return res.render("admin/product/create.ejs")
     
}
const postCreateProductPage = async (req : Request , res : Response) => {
    
    //object destructuring
    const {name , price , detailDesc , shotDesc , quantity , factory , target} = req.body ; 
    const file = req.file; // null (undefined) 
    
    const image = file?.filename ?? null; 
    // //handle create product
    // await handleCreateProduct(name , price , detailDesc , shotDesc , quantity , factory , target , image) ; 
    
    return res.redirect("/admin/product") ; 
}


export { getCreateProductPage , postCreateProductPage }; 