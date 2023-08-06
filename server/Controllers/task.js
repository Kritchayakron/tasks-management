const Task = require('../Models/task')
const bcrypt  = require("bcryptjs")
const jwt = require("jsonwebtoken")
exports.create = async(req,res) => {
    try{
        let payload = {
            status : 0,
            message:'Server Error'
        }
        let position = 0;
        const {title , status, duedate} = req.body 

        let data = await Task.find().sort({position:-1}).limit(1)
        if(data.length != 0) {
            position = data[0].position+1;
        }

        const newTask = new Task({
            title,
            status,
            duedate,
            position
        })

        const add = await newTask.save();
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

exports.data = async(req,res) => {
    try{
        let data;
        if(req.params.id) {
            const id = req.params.id
            data = await Task.find({_id:id}).sort( { position: 1 } ).exec();
        } else {
            data = await Task.find({}).sort( { position: 1 } ).exec();
        }
        res.send(data);
    } catch(Err) {
        res.status(500).send('[001] Server Error',);
    }
 }


exports.update = async(req,res) => {
    try{
        const id = req.params.id
        const data = await Task.findOneAndUpdate({_id:id},req.body,{new:true}).exec();
        if(data) {
            payload = {
                status : 1,
                message:'success'
            }
            return res.json(payload);
        } else {
            payload = {
                status : 0,
                message:'Failed'
            }
            return res.json(payload);
        }
    } catch(Err) {
        res.status(500).send('[002] Server Error');
    }
 }


 
 exports.updatePosition = (req,res) => {

    try{
        let items = req.body;
        let res = true;
        let payload = {
            status : 0,
            message:'Failed'
         }
        items.map((item,index) => {
            const id = item._id;
            Task.findOneAndUpdate({_id:id},item,{new:true}).exec();
        })
       if(res) {
        payload = {
            status : 1,
            message:'success'
        }
        return res.json(payload);
       }
    } catch(Err) {
        return res.json(Err);
    }
 }

 exports.del = async(req,res) => {
    try{
        const id = req.params.id
        const data = await Task.findOneAndDelete({_id:id},req.body,{new:true}).exec();
        let payload = {
            status : 0,
            message:'Failed'
        }
        if(data) {
            payload = {
                status : 1,
                message:'success'
            }
            return res.json(payload);
        } else {
            payload = {
                status : 0,
                message:'Failed'
            }
            return res.json(payload);
        }
    } catch(Err) {
        res.status(500).send('[004] Server Error');
    }
 }
