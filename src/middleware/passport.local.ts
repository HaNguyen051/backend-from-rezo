import { prisma } from "config/client";
import passport from "passport";
import {Strategy as LocalStrategy } from "passport-local";
import { comparePassword, getUserById } from "services/admin/user.service";
import { getUserSumCart, getUserWithRoleById } from "services/client/auth.service";




const configPassportLocal = ()  => {
    /**
     * cos the ghi dee
     * passport.use(new LocalStrategy( {
     * usernameField : "email"}, async function verify(username, password, callback) {
     */
    passport.use(new LocalStrategy({
        passReqToCallback: true
    }, async function verify(req, username, password, callback) {
        
        const { session } = req as any;
        if (session?.messages?.length) {
            session.messages = [];
        }
        console.log(">>>> check username / password :" , username , password)
        const user = await prisma.user.findUnique({
                    where : {username : username }
            })
            if (!user)
            {
                // throw new Error(`Username: ${username} not found`)
                return callback(null, false, { message: `Username/password invalid` });
            }
            //compare password
            const isMatch = await comparePassword(password, user.password)
            if (!isMatch) {
            return callback(null, false, { message: `Username/password invalid` });
            }
            return callback(null ,user as any)
    }));
    
    passport.serializeUser(function (user:any, callback) {
        callback(null, {id: user.id, username: user.username,});

    });

    passport.deserializeUser(async function(user : any, callback) {
        const { id, username } = user;
        //query to database 
        const userInDB: any = await getUserWithRoleById(id); 
        const sumCart = await getUserSumCart(id); 
        
        return callback(null, { ...userInDB , sumCart })
    });
    
}
export default configPassportLocal; 