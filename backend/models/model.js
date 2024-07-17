import mongoose from "mongoose";

const { Schema, model } = mongoose; 

const taskSchema = new Schema({
    userId : {
        type : Number,
        required : true,
    },
    content : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
    updatedAt : {
        type : Date,
        default : Date.now,
    },
}, { timestamps : true})

const Task = model('Task', taskSchema);

export default Task;