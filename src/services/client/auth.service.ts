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

const handleLogin =async (username :string , password :string ,callback : any) => {
    //check user exist in db
    const user = await prisma.user.findUnique({
            where : {username : username }
    })
    if (!user)
    {
        // throw new Error(`Username: ${username} not found`)
          return callback(null, false, { message: `Username: ${username} not found` });
    }
    //compare password
    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
       return callback(null, false, { message: `Invalid password` });
    }
    return callback(null ,user)
}
export { isEmailExist , registerNewUsers , handleLogin}; 