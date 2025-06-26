import { Schema, model } from 'mongoose';

const favoriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  showId: { type: String, required: true }, 
  name: { type: String, required: true },   
  original_name: { type: String },          
  poster_path: { type: String },          
}, { timestamps: true });

export default model('Favorite', favoriteSchema);
