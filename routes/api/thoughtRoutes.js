const router = require('express').Router();

const {
    getAllThoughts, 
    getThoughtById,
    createThought,
    updateThought, 
    deleteThought,
    addReaction, 
    removeReaction
} = require ('../../controllers/thoughtController');

router // /api/thoughts
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

router // /api/thoughts/:id
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

router //api/thoughts/:id/reactions
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

module.exports = router;