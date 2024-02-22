const express=require('express')
const todoController= require('./../controllers/todo_controller')
const authController= require('./../controllers/auth_controller')
const router=express.Router()

router.route('/').post(authController.verifyToken,todoController.addTodo)
.get(authController.verifyToken,todoController.getAllTodo)

router.route('/userTodo').get(authController.verifyToken,todoController.getTodoForUser)

router.route('/:id').get(authController.verifyToken,todoController.getTodo)
.delete(authController.verifyToken,todoController.deleteTodo)
.put(authController.verifyToken,todoController.updateTodo)

router.post('/like/:id',authController.verifyToken,todoController.likeTodo)
router.post('/coment/:id',authController.verifyToken ,todoController.comentTodo)
router.delete('/deleteComent/:id/:comentId', todoController.deleteComent);

module.exports=router;