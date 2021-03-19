const routes = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user"); //Imports user schmea we defined in the models folder




routes.get('/', (req, res) => {
    console.log("get request")
    res.render("register");
})

routes.post('/', (req, res) => {
    console.log("post request");
    const { email, password } = req.body; //Breaks down object properties into variables
    bcrypt.genSalt(10, (err, salt) =>  {
        if (err){
            throw err;
        }else{
            bcrypt.hash(password, salt, (err, hash) => {
                const newUser = new User({
                    email: email,
                    password: hash
                })
                newUser.save()
                .then(user => console.log("User successfully saved to database"))
                .catch(err => console.log("An error occurred saving the user to the database"))
            })
        }
    })
})

module.exports = routes;