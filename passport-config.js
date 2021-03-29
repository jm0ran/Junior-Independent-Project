const User = require("./models/user");
const mongoose = require("mongoose")
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const initialize = (passport) => {
    passport.use(
        new LocalStrategy({usernameField: "email"}, (email, password, done) => {
            console.log("ran strat")
            User.findOne({email: email})
            .then(user => {
                if(!user){
                    console.log("no matching user found");
                    return done(null, false);
                }
                else if(user){
                    console.log("matching user found");
                    return done(null, user)
                }
            })
            .catch(err => {
                return done(err, false)
            })
        })
    )
    passport.serializeUser((user, done) => {
        console.log("Attempted to serialize")
    });
    passport.deserializeUser((id, done) => {
        console.log("Attempted to deserialize")
    });
}

module.exports = initialize;