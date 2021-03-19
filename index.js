const express = require("express"); //Importing Express for the actual html server hosting
const routes = require("./routing/mainRoutes"); //Importing our main router object for express to use (keeps index less junky)
const userSpecific = require("./userSpecific"); //User specific variables
const ejs = require("ejs"); //Importing ejs for page templating, will let us serve dynamic pages to the user
const bodyParser = require("body-parser"); //Importing the body parser so express has the ability to process post requests 
const mongoose = require("mongoose"); //Importing mongoose to give us the ability to connect to our database


// Code below handles database connection as well as 
mongoose.connect(userSpecific.mongoConnection, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Connected to database")
})
.catch((err) => {
    console.log("Failed to connect to database")
})


const app = express(); //Initializes app with express


app.set("view engine", "ejs"); //Sets application view engine to ejs
app.use(express.urlencoded({ //Middleware used to handle post requests
    extended: true
}));
app.use("/", routes) //Throws all requests to our router object








const port = process.env.PORT || 5000; //Grabs either enviornment port or port 5000

app.listen(port, () => { //Starts application listening on previously specified port
    console.log(`Node Server Began Listening on Port ${port}`);
})