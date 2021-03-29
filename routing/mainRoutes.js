const routes = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user"); //Imports user schmea we defined in the models folder
const passport = require("passport");



routes.get('/register', (req, res) => {
    console.log("get request to register page");
    res.render("register", {errorMessages: null});
})

routes.get('/login', (req, res) => {
    console.log("get request to login page");
    res.render("login", {errorMessages: null});
})

routes.post('/register', async (req, res) => {
    let validationPassed = true;
    console.log("post request");
    const { email, name, password1, password2 } = req.body; //Breaks down object properties into variables
    const flatEmail = email.toLowerCase();
    const errorMessages = new Array;
    const doesUserExist = await User.exists({email: flatEmail}); //Returns true of false if email is already in use, await is used to hold continuing code until the boolean is decided
    if (doesUserExist){
        validationPassed = false;
        errorMessages.push("Email is being used with a different account");
    }
    if (!name || !password1 || !password2 || !email){
        validationPassed = false;
        errorMessages.push("Not all fields are filled In");
    }
    if(password1 !== password2){
        validationPassed = false;
        errorMessages.push("Your passwords do not match");
    }
    if(password1.length < 5){
        validationPassed = false;
        errorMessages.push("Your password is too short");
    }

    if (validationPassed){  
        bcrypt.genSalt(10, (err, salt) =>  {
            if (err){
                throw err;
            }else{
                bcrypt.hash(password1, salt, (err, hash) => {
                    if (err){
                        throw err; 
                    }
                    else{
                        const newUser = new User({
                            name: name,
                            email: flatEmail,
                            password: hash
                        })
                        newUser.save()
                        .then(user => {
                            console.log("User successfully saved to database")
                            res.send("registered")
                        })
                        .catch(err => console.log(err.message))
                    }
                })
            }
        })
    }
    else{
        res.render("register", { errorMessages: errorMessages })
    }
})


//Login Handling
routes.post("/login", 
    passport.authenticate("local", {   
        successRedirect: "/good",
        failureRedirect: "/login"
    }), (req, res) => {
    res.send(user.password)
})




module.exports = routes;