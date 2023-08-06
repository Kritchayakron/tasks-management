const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
    title: {
        type:String,
        required: [true,"title is required"]
    },
    status: {
        type:Boolean,
    },
    duedate: {
        type:Date,
        required: [true,"Due Date is required"]
    },
    position: {
        type:Number,
    },
},{timestamps:true})
module.exports  = mongoose.model('tasks',taskSchema);

