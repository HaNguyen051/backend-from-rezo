import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";




const handleCreateProduct = async (
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string, 
    image : string , 
) => {
    //insert into database 
    //connect database 
    // const prisma = new PrismaClient(); 
    // const newProduct = await prisma.product.create({
    //         data: {
    //             name: name , 
    //             price: price , 
    //             detailDesc: detailDesc , 
    //             shortDesc: shortDesc ,
    //             factory: factory , 
    //             target: target , 
    //             image: image, 
               
    //     }
    // })
    // return newProduct; 
       
}
export {handleCreateProduct}