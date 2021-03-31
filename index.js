const express = require("express"); //Importing Express for the actual html server hosting
const routes = require("./routing/mainRoutes"); //Importing our main router object for express to use (keeps index less junky)
const userSpecific = require("./userSpecific"); //User specific variables
const ejs = require("ejs"); //Importing ejs for page templating, will let us serve dynamic pages to the user
const mongoose = require("mongoose"); //Importing mongoose to give us the ability to connect to our database
const path = require("path");
const passport = require("passport");
const session = require("express-session")


//Passport Config
//Passes in our passport variable
const initPassport = require("./passport-config");
initPassport(passport);


// Code below handles database connection as well as 
mongoose.connect(userSpecific.mongoConnection, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Connected to database")
})
.catch((err) => {
    console.log("Failed to connect to database")
})



const app = express(); //Initializes app with express

//Public Static Folder for CSS
app.use(express.static(path.join(__dirname, "public")));


app.set("view engine", "ejs"); //Sets application view engine to ejs
app.use(express.urlencoded({ //Middleware used to handle post requests
    extended: true
}));

//Passport Config and Setup
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
    // ,cookie: {secure: true} 
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//router middleware
app.use("/", routes) 




const port = process.env.PORT || 5000; //Grabs either enviornment port or port 5000

app.listen(port, () => { //Starts application listening on previously specified port
    console.log(`Node Server Began Listening on Port ${port}`);
})