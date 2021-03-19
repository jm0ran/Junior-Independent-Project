const routes = require("express").Router();

routes.get('/', (req, res) => {
    console.log("get request")
    res.render("register");
})

routes.post('/', (req, res) => {
    console.log("post request");
    console.log(req.body.email)
    res.send("post");
})

module.exports = routes;