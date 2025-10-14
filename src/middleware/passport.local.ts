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
            return callback(null ,user)
    }));
    
    passport.serializeUser(function (user:any, cb) {
    process.nextTick(function() {
        return cb(null, {
        id: user.id,
        username: user.username,
        });
    });
    });

    passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
    });
    }
export default configPassportLocal; 