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

const addProductToCart = async (quantity : number , productId : number , user : Express.User) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId :user.id,
        }
    })
     
    const product = await prisma.product.findUnique({
        where: { id: productId } ,
    })
    
    if (cart)
    {
         //update
    } else {
        //create 
        await prisma.cart.create({
            data: {
                sum: quantity, 
                userId: user.id,
                CartDetail: {
                    create: [
                        {
                            price: product.price, 
                            quantity: quantity, 
                            productId : productId
                        }
                    ]
                }
            }
        })
    }
}
export{getItem , getProductById , addProductToCart}