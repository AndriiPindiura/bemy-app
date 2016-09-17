import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema({
  text: String,
  answers: [
    [{}],
  ],
  active: { type: Boolean, default: true },
});

export default mongoose.model('Question', QuestionSchema);
