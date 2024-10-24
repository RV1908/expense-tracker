const express = require('express')
const app = express();

app.get("/api/test", (req,res)=>{
    res.json('test ok1');
});

app.listen(4040);

console.log("app listening at port 4040")


