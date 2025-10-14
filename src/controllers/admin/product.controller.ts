import { render } from "ejs";
import { Request, Response } from "express";
import { getAllProducts, getProductByID, handleCreateProduct, handleDeleteProduct, updateProductById } from "services/admin/product.service";

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
const getViewProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    //get product by id
    const product = await getProductByID(id);

    const factoryOptions = [
        { name: "Apple (MacBook)", value: "APPLE" },
        { name: "Asus", value: "ASUS" },
        { name: "Lenovo", value: "LENOVO" },
        { name: "Dell", value: "DELL" },
        { name: "LG", value: "LG" },
        { name: "Acer", value: "ACER" },
    ];

    const targetOptions = [
        { name: "Gaming", value: "GAMING" },
        { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
        { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
        { name: "Mỏng nhẹ", value: "MONG-NHE" },
        { name: "Doanh nhân", value: "DOANH-NHAN" },
    ];

    return res.render("admin/product/detail.ejs", {
        product,
        factoryOptions,
        targetOptions
    })
}
const postDeleteProductPage = async (req :Request , res : Response) => {
   
    const { id } = req.params;  
    await handleDeleteProduct(id); 
    return res.redirect("/admin/product") ; 
}
const postUpdateProductPage = async (req :Request , res : Response) => {
    //object destructuring
    const {id, name , price , detailDesc , shortDesc , quantity , factory , target} = req.body as TProductSchema; 
    const file = req.file; // null (undefined) 
    const image = file?.filename ?? undefined; 
    await updateProductById(+id , name , +price , detailDesc , shortDesc , +quantity , factory , target , image); 

    return res.redirect("/admin/product") ; 
}
export { getCreateProductPage, postCreateProductPage, getAdminProductPage  , getViewProduct , postDeleteProductPage , postUpdateProductPage}; 


