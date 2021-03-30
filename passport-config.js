const User = require("./models/user");
const mongoose = require("mongoose")
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const initialize = (passport) => {
    passport.use(
        new LocalStrategy({usernameField: "email"}, (email, password, done) => {
            console.log("ran strat")
            User.findOne({email: email.toLowerCase()})
            .then(user => {
                //Runs after checking for user
                if(!user){ //If there is no user that exists
                    console.log("no matching user found");
                    return done(null, false);
                }
                else if(user){ //If a user is found
                    console.log("matching user found");
                    bcrypt.compare(password, user.password)
                    .then(matches =>{
                        if(matches){
                            return done(null, user);
                        }else{
                            console.log("incorrect password");
                            return done(null, false);
                        }
                    })
                    .catch(err => {
                        console.log(err.message)
                    })
                    
                }
            })
            .catch(err => {
                return done(err, false);
            })
        })
    )
    passport.serializeUser((user, done) => {
        console.log("Attempted to serialize")
        done(null, user.id)
    });
    passport.deserializeUser((id, done) => {
        console.log("Attempted to deserialize")
        done(null, user.id)
    });
}

module.exports = initialize;