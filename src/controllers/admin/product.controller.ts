import { Request, Response } from "express";
import { getAllProducts, handleCreateProduct } from "services/admin/product.service";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";


const getCreateProductPage =async (req: Request, res: Response) => {
    const errors = []; 
    const oldData = {
        name: "", 
        price: "", 
        detailDesc: "", 
        shortDesc: "", 
        quantity: "",
        factory: "", 
        target :""
    }
    return res.render("admin/product/create.ejs", {
        errors , oldData
    } )
     
}
const postCreateProductPage = async (req : Request , res : Response) => {
    
    //object destructuring
    const {name , price , detailDesc , shortDesc , quantity , factory , target} = req.body as TProductSchema ; 
    const file = req.file; // null (undefined) 
    const image = file?.filename ?? null; 
    const validate = ProductSchema.safeParse(req.body); 
    if (!validate.success)
    {
        //error
        const errorsZod = validate.error.issues; 
        const errors = errorsZod?.map(item => `${item.message} (${item.path[0]})`); 
        const oldData = {
          name , price , detailDesc , shortDesc , quantity , factory , target
        }
        
        return res.render("admin/product/create.ejs", 
            {
                errors , oldData
            }
        ) ; 
    }
    
    //success
    
    // //handle create product
    await handleCreateProduct(name , price , detailDesc , shortDesc, quantity , factory , target , image) ; 
    
    return res.redirect("/admin/product") ; 
}
const getAdminProductPage = async (req : Request, res : Response) => {
    
    const products = await getAllProducts(); 
    return res.render("admin/product/show" , {products})
 
}

export { getCreateProductPage, postCreateProductPage, getAdminProductPage }; 


