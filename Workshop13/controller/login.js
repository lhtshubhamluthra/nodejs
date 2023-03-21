const express=require("express")
const dbconnect=require("../model/connection")
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const loginModel=require("../model/login_model")
const bcrypt=require('bcrypt')
const authorize=require('./middleware')
const jwtKey='keyToPass'

const app=express();
app.use(express.json());

app.get('/login',async(req,res)=>{

        
    let data=await loginModel.find({login_id: req.body.login_id})
   
        console.log(data);
    if(data==null)
    {
        res.send('user not found')
    }
    
    try{   
             if (await bcrypt.compare(req.body.password, data[0].password))
            {       
                jwt.sign({data},jwtKey, { expiresIn: '50000s' },(err,token)=>{
                    res.status(200).json({ token })
                })
                
            }
            else
            {
                    res.send('password not matched');
            }

    }
    catch(err)
    {
        res.send(err)
    }

})

app.get('/detail', authorize(['developer']),async (req, res) => {
    
    let result = await loginModel.find({});
    res.status(200).json({alluser:result});
    console.log({result});
    
    
  });

  app.listen(3000);