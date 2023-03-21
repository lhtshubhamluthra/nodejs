const connection = require('./connection')
const bcrypt = require('bcrypt')
const express = require('express')
const model = require('./model')
const mongoose = require('mongoose')
const app = express();

app.use(express.json())
app.get('/', (req, res) => {

    res.send(`Welcome to Home Page 
    To login  go to /login route
    To add any user go to /signup route
    To delete any user go to /delete route
    To update any data of exixting user go to /update route`);
})

app.get('/login', async (req, res) => {

    let data = await model.find({login_id:req.body.login_id});
    if(data==null)
    {
        res.send('user not found')
    }
    
    try{   
             if (await bcrypt.compare(req.body.password, data[0].password))
            {       
                res.send('login succesfull...credentials matched');
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


app.post('/signup', async (req, res) => {

    const salt=await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password,salt)
    
    let data = new model({
        name: req.body.name,
        login_id: req.body.login_id,
        password: hashPassword,
        role:req.body.role,
        designation: req.body.designation
        
        
    })

    let result = await data.save();
    res.status(201).json({Saved_Data:result})
})


app.delete('/delete', async (req, res) => {


    let ack = await model.deleteOne({ login_id: req.body.login_id });
    res.send(ack);

});


app.put('/update/:id', async (req, res) => {


    model.findOneAndUpdate({ _id:req.params.id }, { $set: { name: req.body.name } }).then(result => {
        res.status(201).json({
            updated_data: result
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    })



})
    app.listen(3000)