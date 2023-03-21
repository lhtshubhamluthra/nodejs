const express=require("express")
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const model=require('../model/signup_model')
const bcrypt=require('bcrypt')
const app=express();


app.use(express.json())


app.post('/signup',async(req,res)=>{
       
try{


     await bcrypt.hash(req.body.password,10,(err,hash)=>{
        
        if(err)
        {
            console.log(err)
        }
        else
        {   console.log(hash)
            let data=new model({
                name: req.body.name,
                login_id: req.body.login_id,
                password: hash,
                role:req.body.role,
                designation: req.body.designation
            })
        
           data.save().then(result=>{
               res.status(200).json({allusers:result})
           });
            
        }
    })
       
    
}
catch(err)
{
    res.send(err);
}


});


app.listen(3000);