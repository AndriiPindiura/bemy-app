import mongoose, { Schema } from 'mongoose';
import User from './user';

const deepPopulate = require('mongoose-deep-populate')(mongoose);

const AnswerSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  answers: [{
    question: { type: Schema.ObjectId, ref: 'Question' },
    answers: Array,
  }],
});

function assignSocionicType() {
  const Answer = mongoose.model('Answer', AnswerSchema);
  // console.log(Answer);
  Answer.findById(this._id)
  .deepPopulate('user answers.question')
    .exec()
    .then(node => {
      // console.log(node);
      const answers = node.answers.map(answer => answer.answers.join());
      console.log('==============================');
      console.log(answers);
      let result = 0;
      answers.forEach(answer => {
        // console.log(answer);
        // console.log('=====');
        node.answers.filter(nodeAnswer => nodeAnswer.answers.indexOf(answer) > -1)[0].question.answers.filter(nodeAnswer => nodeAnswer._id == answer).forEach(itemAnswer => result += itemAnswer.socionicType);
        console.log(result);
      });
      console.log(node.user);
      const user = node.user;
      user.socionicType.intrivert = result < 10 ? result > 2 ? true : false : null;
      user.socionicType.ratio = result > 9 && result < 100 ? result > 2 ? true : false : null;
      user.socionicType.logic = result > 99 && result < 1000 ? result > 2 ? true : false : null;
      user.socionicType.intuit = result > 999 ? result > 2 ? true : false : null;
      User.findByIdAndUpdate(user._id, { $set: { socionicType: user.socionicType }}, { new: true })
        .then(res => console.log(res))
        .catch(error => console.log(error));
      // node.answers.forEach(answer => {
      //   answer.question.answers.filter(selectedAnswer => selectedAnswer._id === answer._id)
      // });
      // node.answers.forEach(item => console.log(item.question.answers));
    })
    .catch(err => console.log(err));
}

AnswerSchema.post('save', assignSocionicType);

AnswerSchema.plugin(deepPopulate, {});

export default mongoose.model('Answer', AnswerSchema);
