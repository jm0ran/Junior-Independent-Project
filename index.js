const express = require("express");
const routes = require("./routing/mainRoutes")
const ejs = require("ejs");
const bodyParser = require("body-parser");




const app = express();



app.set("view engine", "ejs"); //Sets application view engine to ejs
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/", routes) //Throws all requests to our router object








const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Node Server Began Listening on Port ${port}`);
})