import { prisma } from "config/client";
import { log } from "node:console";


const initDatabase = async () => {
    const countUser = await prisma.user.count();
    if (countUser === 0) {
        await prisma.user.createMany({
            data: [
                {
                    username: "hoidanit@gmail.com",
                    password: "12356",
                    accountType: "SYSTEM"
                },
                        
                {
                    username: "Admin@gmail.com",
                    password: "12356",
                    accountType: "SYSTEM"
                }
            ]
        })
    }
    else {
        console.log(">>>Already init data"); 
    }

}
export default initDatabase; 