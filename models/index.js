const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/todo-demo', {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
})
  .then(value => console.log('MongoDB 연결 성공'))
  .catch(reason => console.log('MongoDB 연결 실패'))


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;