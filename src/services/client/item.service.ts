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
        //udpate sum cart 
        await prisma.cart.update({
            where: { id: cart.id }, 
            data: {
                sum: {
                     increment : quantity , 
                 }
            }
        })
        
        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                productId: productId, 
                cartId :cart.id
            }
        })
        //update cartdetail
        await prisma.cartDetail.upsert({
            where: {
                id : currentCartDetail?.id ?? 0 , 
            },
            update :{
                quantity: {
                   increment : quantity , 
               }
            }, 
            create: {
                price: product.price, 
                quantity: quantity, 
                productId: productId, 
                cartId : cart.id
            },
        })
        
    } else {
        //create cart + cart-detail
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
const getProuctInCart = async (userId : number) => {
    const cart = await prisma.cart.findUnique({
        where: {userId}
    })
    if (cart)
    {
        const currentCartDetail = await prisma.cartDetail.findMany({
            where: { cartId: cart.id }, 
            include: {product :true}
        })
        return currentCartDetail; 
    }
    return []; 
}
export{getItem , getProductById , addProductToCart , getProuctInCart}