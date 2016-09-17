import mongoose, { Schema } from 'mongoose';

const AnswerSchema = new Schema({
  userId: { type: Schema.ObjectId, ref: 'User' },
  answers: [{
    questionId: { type: Schema.ObjectId, ref: 'Question' },
    answer: Number,
  }],
});

export default mongoose.model('Answer', AnswerSchema);
