import mongoose, { Schema } from 'mongoose';

const deepPopulate = require('mongoose-deep-populate')(mongoose);

const AnswerSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  answers: [{
    question: { type: Schema.ObjectId, ref: 'Question' },
    answers: Array,
  }],
});

AnswerSchema.plugin(deepPopulate, {});

export default mongoose.model('Answer', AnswerSchema);
