const User = require('../Models/user')
const bcrypt  = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.myaccount = async(req,res) => {
    try{
        const id = req.params.id
        const dataUser = await User.findOne({_id:id}).exec();
        res.send(dataUser);
    } catch(Err) {
        res.status(500).send('Server Error');
    }
}

exports.list = async(req,res) => {
    try{
        const dataUser = await User.find({}).exec();
        res.send(dataUser);
    } catch(Err) {
        res.status(500).send('Server Error');
    }
 }

 exports.register = async(req,res) => {
    try{
        const {username , password} = req.body 
        const dataUser = await User.findOne({username}).exec();
        let payload = {
            status : 0,
            message:'Server Error'
        }

        if(username.length < 4) {
            payload = { status : 0,message:'Username must be more than 4 characters.'}
            return res.json(payload);
        }

        if(password.length < 4) {
            payload = { status : 0,message:'Password must be more than 4 characters.'}
            return res.json(payload);
        } 

        if (dataUser) {
            payload = {
                status : 0,
                message:'This username already exists.'
            }
            return res.json(payload);
        }
       
        const salt = await bcrypt.genSalt(10);
        let newUser = new User({
            username,
            password,
        })
        if(password) {
            newUser.password = await bcrypt.hash(password,salt);
        }
        const add = await newUser.save();
        if(add) {
            payload = {
                status : 1,
                message:'success'
            }
            return res.json(payload);
        } else {
            return res.json(payload);
        }
    } catch(Err) {
      
        return res.json(Err);
    }
 }

 exports.update = async(req,res) => {
    try{
        const id = req.params.id
        const dataUser = await User.findOneAndUpdate({_id:id},req.body,{new:true}).exec();
        res.send(dataUser);
    } catch(Err) {
        res.status(500).send('Server Error');
    }
 }

 exports.login = async(req,res) => {
    try{
        const {username , password} = req.body 
        const dataUser = await User.findOne({username:username}).exec();
        if(dataUser){
            const isMatch = await bcrypt.compare(password,dataUser.password);
 
            if(isMatch) {
                const payload = {
                    id : dataUser._id.toString(),
                    username:username
                }
                jwt.sign(payload,'jwtsecret',{expiresIn:3600},(err,tokenAuthen)=>{
                    if(err) throw err;
                    res.json({tokenAuthen,payload});
                })
            } else {
               res.json({'message':'Username or Password Invalid!'});
            }
        } else {
           res.json({'message':'Username or Password Invalid!'});
        }
    } catch(Err) {
        res.status(500).send('Server Error!');
      
    }
 }