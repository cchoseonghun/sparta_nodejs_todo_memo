const express = require("express");
const Todo = require('../models/todo.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.send("Hi!");
});

router.post('/todos', async(req, res) => {
  const {value} = req.body;

  // order에 대해 auto_increment 기능 부여하는 코드

  const maxOrderByUserId = await Todo.findOne({}).sort('-order').exec();  
  // Todo에서 findOne 할건데 order 값을 역순으로 조회

  const order = maxOrderByUserId ? 
    maxOrderByUserId.order + 1 :  // maxOrderByUserId 있을 때, 
    1;                            // maxOrderByUserId == null

  // create가 아닌 이런 방식으로도 저장 가능
  const todo = new Todo({ value, order });
  await todo.save();

  res.send({ todo });
});

router.get('/todos', async(req, res) => {
  const todos = await Todo.find({}).sort('-order').exec();

  res.send({ todos });
});

router.patch('/todos/:todoId', async (req, res) => {
  const {todoId} = req.params;
  const {order} = req.body;

  const currentTodo = await Todo.findById(todoId);
  // const currentTodo = await Todo.findOne({ _id: todoId });
  if (!currentTodo) {
    return res.status(400).json({"errorMessage": "존재하지 않는 할 일 입니다."});
  }

  if (order) {
    const targetTodo = await Todo.findOne({ order }).exec();
    if (targetTodo) {
      targetTodo.order = currentTodo.order;
      await targetTodo.save();
    }
    currentTodo.order = order;
    await currentTodo.save();
  }
  res.send(); 
})

module.exports = router;