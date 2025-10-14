import passport from "passport";
// var express = require('express');

//  LocalStrategy = require('passport-local');
// var crypto = require('crypto');
// var bcrypt = require('bcrypt');
// var db = require('../db');
import {Strategy as LocalStrategy } from "passport-local";
import { handleLogin } from "services/client/auth.service";



const configPassportLocal = () => {
    passport.use(new LocalStrategy(function verify(username, password, callback) {
//   db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
//     if (err) { return cb(err); }
//     if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
    
//     bcrypt.compare(password, row.hashed_password, function(err, result) {
//       if (err) { return cb(err); }
//       if (!result) {
//         return cb(null, false, { message: 'Incorrect username or password.' });
//       }
//       return cb(null, row);
//     });
        //   });
        return handleLogin(username , password , callback)
}));
}
export default configPassportLocal; 