const routes = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user"); //Imports user schmea we defined in the models folder




routes.get('/register', (req, res) => {
    console.log("get request")
    res.render("register");
})

routes.post('/register', (req, res) => {
    let validationPassed = true;
    console.log("post request");
    const { email, name, password1, password2 } = req.body; //Breaks down object properties into variables
    const errorMessages = new Array;
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
                            email: email,
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
        res.send(errorMessages);
    }
})

module.exports = routes;