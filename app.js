const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRouter=require('./routers/user_router')
const todoRouter=require('./routers/todo_router')
const app = express();
const PORT = 4000;



// Connect to MongoDB
mongoose.connect('mongodb+srv://siyadas878:siyad123@cluster0.wm9o3sy.mongodb.net/');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.json());

app.use('/api/user',userRouter)
app.use('/api/todo',todoRouter)


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
