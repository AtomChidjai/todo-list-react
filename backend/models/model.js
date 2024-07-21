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
}, { timestamps : true})

const Task = model('Task', taskSchema);

export default Task;