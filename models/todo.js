const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  value: String, // 할 일이 어떤것인지
  doneAt: Date,   // 할 일이 언제 완료되었는지
  order: Number,  // 몇 번째 할 일인지
});

TodoSchema.virtual('todoId').get(function() {
  return this._id.toHexString();
}); 
// _id의 경우 toHexString() 처리를 해줘야 에러가 없다고들 한다.

TodoSchema.set('toJSON', { virtuals: true })
// 아래에 해당하는 model을 바탕으로 데이터를 생성, 조회 등을 할 때 
// 위에서 지정한 todoId를 JSON 타입으로 변경할 때 보여준다. 라는 의미

module.exports = mongoose.model('Todo', TodoSchema);