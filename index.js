const express = require("express");

const app = express();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Test Response");
})

app.listen(port, () => {
    console.log(`Node Server Began Listening on Port ${port}`);
})