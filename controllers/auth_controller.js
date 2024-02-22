const User = require('../models/user_model');
const todo = require('../models/todo_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key'; 

exports.userSignup= async (req, res,next) => {
    try {
      const { username, password } = req.body;
  
      // Check if username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const maxNumericIdTodo = await todo.findOne({}, {}, { sort: { id: -1 } });
  
      const id = maxNumericIdTodo ? maxNumericIdTodo.id + 1 : 1;

  
      // Create a new user
      const user = new User({ id:id,username, password: hashedPassword });
      await user.save();
  
      res.json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message});
    }
  }



// Login Route
exports.userLogin=async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_KEY,{ expiresIn: '10h' });
    
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Middleware to verify JWT token
  exports.verifyToken = (req, res, next) => {
    const tokenToken = req.headers['authorization'];
    const token = tokenToken && tokenToken.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
  
      req.userId = decoded.userId;
      next();
    });
  };