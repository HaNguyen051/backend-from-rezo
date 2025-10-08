import getConnection from "config/database"
// import { PrismaClient } from '@prisma/client'
import { prisma } from "config/client";

const handleCreateUser = async (
    fullName : string ,
    email : string , 
    address : string 
) => {
    //insert into database 
    //connect database 
    // const prisma = new PrismaClient(); 
    const newUser = await prisma.user.create({
        data: {
            name: fullName, 
            email: email, 
            address:address
        }
    })
    return newUser; 
       
}

const handleDeleteUser = async (id : string) => {
    //connect database 
    const deleteUser = await prisma.user.delete({
        where: {
            id: +id,
          }
      })
}


const getAllUsers = async()=>{
    const users= await prisma.user.findMany(); 
    return users; 
}
const getUserById = async (id : string) => {
 
    //connect database 
    const findUser = await prisma.user.findUnique({
        where: {
              id : +id , 
          }
    })
    return findUser; 
}
const handleUpdateUser = async(name : string , email : string , address : string , id : string) => {
   
    const updateUser = await prisma.user.update(
        {
            where: { id: +id }, 
            data: {
                name: name , 
                email: email , 
                address :address
            }
        }
    )
    return updateUser; 
}
export{handleCreateUser , getAllUsers ,handleDeleteUser ,getUserById , handleUpdateUser} ; 