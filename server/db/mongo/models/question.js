import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema({
  title: String,
  socionicType: Number,
  isRadio: Boolean,
  answers: Array,
});

export default mongoose.model('Question', QuestionSchema);
