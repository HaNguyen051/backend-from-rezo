import { prisma } from "config/client";
import passport from "passport";
import {Strategy as LocalStrategy } from "passport-local";
import { comparePassword } from "services/admin/user.service";




const configPassportLocal = ()  => {
    /**
     * cos the ghi dee
     * passport.use(new LocalStrategy( {
     * usernameField : "email"}, async function verify(username, password, callback) {
     */
    passport.use(new LocalStrategy(async function verify(username, password, callback) {
        console.log(">>>> check username / password :" , username , password)
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
}));
}
export default configPassportLocal; 