const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    task:String,
    category : String,
    checked:Boolean
})

const TaskModel = mongoose.model("task", TaskSchema)
module.exports = TaskModel