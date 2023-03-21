const express = require("express");
const model = require("./dbConnect/connection");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const app = express();
app.use(express.json());

app.post("/create-user", async (req, res) => {
  try {
    let data = new model({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      age: req.body.age,
    });

    let result = await data.save();
    console.log("result", result);

    res.send("Done");
  } catch (err) {
    res.status(500).send(), console.log(err);
  }
});

app.post("/login-user", async (req, res) => {
  try {
    let data = new model({
      username: req.body.username,
      password: req.body.password,
    });
   

    jwt.sign({ data }, "secretkey", (err, token) => {
      if (err) res.send(err);
      res.send(token);
    });
  } catch (err) {
    res.status(500).send(), console.log(err);
  }
});



app.post("/profile",verifyToken,async(req,res)=>{
    const id=req.data.data.username
    const password=req.data.data.password

    let data=await model.find({username:id, password:password});
    res.send(data);
  

})
function verifyToken(req, res, next) {
  const authHeader=  req.headers['authorization']
  const token=authHeader && authHeader.split(' ')[1]

  if(token ==null ) return res.send("Token not available")

  jwt.verify(token,"secretkey",(err,token)=>{
    if(err) return res.send(err)
        req.data=token
    next()
  })
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on Port No:${PORT}`);
});
