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
const getProductInCart = async (userId : number) => {
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

const deleteProductInCart = async (cartDetailId: number, userId: number, sumCart: number) => {
    //xóa cart-detail

        // Delete cart-detail
        const deletedCartDetail = await prisma.cartDetail.delete({
            where: { id: cartDetailId }
        });

        // Check remaining items or use sumCart for decision
        const remainingItems = await prisma.cartDetail.count({
            where: { cart: { userId } }
        });

        if (remainingItems === 0 || sumCart === 0) {
            // Delete cart if no items remain
            await prisma.cart.delete({
                where: { userId }
            });
        } else {
            // Update cart sum
            await prisma.cart.update({
                where: { userId },
                data: {
                    sum: {
                        decrement: deletedCartDetail.quantity
                    }
                }
            });
        }
  
}

export{getItem , getProductById , addProductToCart , getProductInCart , deleteProductInCart}