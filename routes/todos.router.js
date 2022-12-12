const express = require("express");
const Todo = require('../models/todo.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.send("Hi!");
});

router.post('/todos', async(req, res) => {
  const {value} = req.body;

  // order에 대해 auto_increment 기능 부여하는 코드

  const maxOrderByUserId = await Todo.findOne().sort('-order').exec();  
  // Todo에서 findOne 할건데 order 값을 역순으로 조회

  const order = maxOrderByUserId ? 
    maxOrderByUserId.order + 1 :  // maxOrderByUserId 있을 때, 
    1;                            // maxOrderByUserId 없을 때

  const todo = new Todo({ value, order });
  await todo.save();

  res.send({ todo });
});

module.exports = router;