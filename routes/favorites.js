import { Router } from 'express';
import Favorite from '../models/Favorite.js';
import auth from '../middleware/authenticate.js';

const router = Router();

// POST - Ajouter aux favoris
router.post('/', auth, async (req, res) => {
  const { showId, name, poster_path, original_name } = req.body;
  try {
    // Utilise le modèle Favorite pour findOne
    const exists = await Favorite.findOne({ userId: req.userId, showId });
    if (exists) return res.status(409).json({ message: 'Déjà dans vos favoris.' });

    const favorite = new Favorite({ userId: req.userId, showId, name, poster_path, original_name });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// GET - Obtenir les favoris de l'utilisateur
router.get('/', auth, async (req, res) => {
  try {
    // Utilise le modèle Favorite pour find
    const favorites = await Favorite.find({ userId: req.userId });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// DELETE - Supprimer un favori
router.delete('/:showId', auth, async (req, res) => {
  try {
    // Utilise le modèle Favorite pour deleteOne
    await Favorite.deleteOne({ userId: req.userId, showId: req.params.showId });
    res.json({ message: 'Favori supprimé.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

export default router;
