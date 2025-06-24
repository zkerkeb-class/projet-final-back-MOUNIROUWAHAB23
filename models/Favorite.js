import { Schema, model } from 'mongoose';

const favoriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  showId: { type: String, required: true }, // ID TMDB de la série
  name: { type: String, required: true },   // Nom dans la langue courante
  original_name: { type: String },          // (optionnel) Nom original de la série
  poster_path: { type: String },            // Chemin de l'affiche TMDB (ex: /abc123.jpg)
}, { timestamps: true });

export default model('Favorite', favoriteSchema);
