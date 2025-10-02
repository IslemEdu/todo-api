// server.js
const express = require('express');
const app = express();

app.use(express.json());

let todos= [];
app.post('/todos', (req, res) => {
    const {title} = req.body;

    if(!title || title.trim()===''){
        return res.status(400).json({error:'title is required'})
    }
    
    
    const newTodo ={
        id:Date.now(),
        title : title.trim(),
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/todos/:id',(req ,res) =>{
    const id =parseInt(req.params.id);
    const todo = todos.find(t =>t.id ===id);
    if(!todo) return res.status(404).json({error : 'todo not found'});
    
    const {title} =req.body;
    if(!title ||title.trim() ===''){
        return res.status(400).json({error :'title is required'});
    }
    todo.title = req.body.title;
    res.json(todo)
})

app.delete('/todos/:id', (req ,res) =>{
    const id = parseInt(req.params.id);
    todos = todos.filter(t =>t.id !== id);
    res.status(204).send();
})


app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});