import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  showId: { type: String, required: true }, 
  text: { type: String, required: true },
}, { timestamps: true });

export default model('Comment', commentSchema);
