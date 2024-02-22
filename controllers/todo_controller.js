const Todo = require('../models/todo_model');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key';
const Comment=require('../models/comment_model')


// Todo Routes
exports.getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find()
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get One Todo
exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id );

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get One Todo
exports.getTodoForUser = async (req, res) => {
  try {

    const todo = await Todo.find({user:req.userId});

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// To Add Todo 
exports.addTodo = async (req, res) => {
  try {
     const newTodo=await Todo.create({
      text:req.body.text,
      user:req.userId
     });
     

     res.status(201).json({
      status:'Created',
      data:newTodo
     })

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// To Update Todo 
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    console.log(req.userId);

    if (todo.user.id !== req.userId) {
      return res.status(403).json({ error: 'Not user' });
    }

    // Update the Todo
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// To Delete Todo 
exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({ id: req.params.id });

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(deletedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// like todo
exports.likeTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Check if the user has already liked the todo
    const hasLiked = todo.likes.includes(req.userId);

    if (hasLiked) {
      todo.likes.pull(req.userId);
    } else {
      todo.likes.push(req.userId);
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Add coment to Todo Route
exports.comentTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    const newComment=await Comment.create({
     text:req.body.text,
      user:req.userId
    })
    todo.coment.push(newComment._id)

    const updatedTodo = await todo.save();

    // Respond with the updated todo
    res.json(updatedTodo);
  } catch (err) {
    // Handle any errors that may occur
    res.status(500).json({ error: err });
  }
};

exports.deleteComent = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const comentId = req.params.comentId; 
    if (!comentId) {
      return res.status(400).json({ error: 'coment ID is required' });
    }

    const comentIndex = todo.coment.findIndex(
      (coment) => coment.id === comentId && coment.user === req.userId
    );

    if (comentIndex !== -1) {
      return res.status(401).json({ error: 'Unauthorized to delete coment' });
    }

    todo.coment.splice(comentIndex, 1);

    const updatedTodo = await todo.save();

    res.json({ success: "deleted successfully", updatedTodo });
  } catch (err) {
    // Handle any errors that may occur
    res.status(500).json({ error: err.message });
  }
};

