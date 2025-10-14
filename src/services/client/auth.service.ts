import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { comparePassword, hashPassword } from "services/admin/user.service";

const isEmailExist = async (email) => {
    if (await prisma.user.findUnique({
        where: { username: email }
    }
    )) return true; 
}


const registerNewUsers = async (fullName: string, email: string, password: string) => {
    
    const newPassword = await hashPassword(password); 
    const userRole = await prisma.role.findUnique({
        where:{name : "USER"}
    })
    
    if(userRole)
   { const newUser = await prisma.user.create({
        data: {
            fullName: fullName,
            username: email,
            password: newPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId:userRole.id 
       }
   })
    } else {
        throw new Error("User Role không tồn tại")
    }
    
}


export { isEmailExist , registerNewUsers }; 