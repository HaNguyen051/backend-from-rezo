import { prisma } from "config/client";


const getItem = async() => {
    const findProduct = await prisma.product.findMany(); 
    return findProduct; 
}
const getProductById = async (id : number) => {
    return await prisma.product.findUnique(
        {
            where: { id } 
        }
    ); 

}
export{getItem , getProductById}