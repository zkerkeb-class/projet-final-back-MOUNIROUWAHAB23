import { Router } from 'express';
import Comment from '../models/Comment.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

// Ajouter un commentaire
router.post('/', authenticate, async (req, res) => {
  const { showId, text } = req.body;
  try {
    const comment = await Comment.create({
      userId: req.userId,
      showId,
      text
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Récupérer les commentaires d'une série
router.get('/:showId', async (req, res) => {
  try {
    const comments = await Comment.find({ showId: req.params.showId }).populate('userId', 'email');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
