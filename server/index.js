const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let todoModel = require('./todo_schema');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost:27017/todoapp",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('Connected to mongoDB');
})
.catch(err=>{
    console.log(err);
});


app.post('/todo/add',(req,res)=>{

    let newTodo = new todoModel;
    newTodo.title = req.body.todo;
    newTodo.completed = false;
    newTodo.save((err)=>{
        if(err){
            res.send("Error while adding Todo");
        }else{
            res.send("Todo added");
        }
    })

});

app.get('/todo/completed', (req, res) => {
  todoModel.find({ completed: true }, (err, todos) => {
    if (err) {
      res.send("Error while fetching Todos");
    } else {
      res.json(todos)
    }
  })
})

app.get('/todo/uncompleted', (req, res) => {
  todoModel.find({completed:false},(err, todos) => {
    if(err){
      res.send("Error while fetching Todos");
    }else{
      res.json(todos)
    }
  })
})

app.put('/todo/complete/:id',(req, res) => {
    todoModel.findByIdAndUpdate(req.params.id, {completed: true},(err, todo) =>{
      if(!err){
        res.send("Good Work");
      }
    })
});

app.delete('/todo/:id', (req, res) => {
    let query = { _id: req.params.id }
    todoModel.deleteOne(query, (err) => {
      if(err){
        res.send("Error while deleting todo")
      }else{
        res.send("Todo deleted")
      }
    })
});


app.listen(3000,()=>{
    console.log('Server started on port 3000');
});