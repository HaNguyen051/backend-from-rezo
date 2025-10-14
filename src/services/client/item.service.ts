import { prisma } from "config/client";


const getItem = async() => {
    const findProduct = await prisma.product.findMany(); 
    return findProduct; 
}
export{getItem}