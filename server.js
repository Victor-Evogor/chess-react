let express = require("express");
let app = express();

app.use(express.static("build"));

app.listen(5000,()=>{console.log("it's alive")});