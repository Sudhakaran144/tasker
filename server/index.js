const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TaskModel = require('./models/tasks');
const UserModel = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/Tasker");

app.post("/register", (req,res)=>{
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
});

app.post("/login", (req,res)=>{
    const {email,password} = req.body;
    UserModel.findOne({email,password})
    .then(user =>{
        if(user){
            console.log("Login successful");
            res.json({ Success:true, user });
        } else {
            console.log("email does not exist");
            res.status(401).json({success:false,message:"Invalid email or password"});
        }
    })
    .catch(err => {
        console.error("Login failed:", err);
        res.status(500).json({ success: false, message: "An error occurred" });
    });
});



app.get("/", (req,res) => {
    TaskModel.find({})
    .then(task => res.json(task))
    .catch(err => res.json(err))
});

app.get("/getTask/:id", (req,res)=>{
    const id = req.params.id;  
    TaskModel.findById({_id:id})
    .then(task => {
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        res.json(task);
    })
    .catch(err => res.status(500).json(err));
});


 
app.put("/updateTask/:id", (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndUpdate(id, { task: req.body.task, category: req.body.category ,checked:req.body.checked}, { new: true, select: '_id task category checked' })
        .then(updatedTask => res.json(updatedTask)) // Send back the updated task directly
        .catch(err => res.json(err));
});



app.delete("/deleteTask/:id", (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndDelete({ _id: id })
    .then(task => {
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        console.log("Task deleted successfully");
        res.json({ success: true, task });
    })
    .catch(err => {
        console.error("Error deleting task:", err);
        res.status(500).json({ success: false, message: "An error occurred while deleting task" });
    });
});

app.post("/addTask" , (req,res)=>{
    TaskModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
});

app.listen(3002,()=>{
    console.log("Server is running");
});
