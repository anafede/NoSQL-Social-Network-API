const {User, Thought} = require ('../models');

module.exports = {
    getAllThoughts (req,res){   //all thoughts
        Thought.find({})
        .populate ({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(thoughtData =>
            res.json(thoughtData))
        .catch (err => {
            console.log(err);
            res.status(500).json(err)
        })
    },

    getThoughtById (req, res){ //thought by id
        Thought.findOne({__id: req.params.thoughtId})
        .then((thoughtData) => ! thoughtData
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thoughtData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        });
    }, 

    createThought(req, res){
        Thought.create(req.body)
        .then((thoughtData) => {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts: thoughtData._id}},
                {runValidators: true, new: true}
            );
        })
        .then((userData) => !userData
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(thoughtData))
        .catch ((err) => { 
            console.log(err);
            res.status(500).json(err)
        });
    },

    updateThought(req, res){ //update by id
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((thoughtData) => !thoughtData 
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thoughtData))
        .catch ((err) => { 
            console.log(err);
            res.status(500).json(err)
        })
    },

    deleteThought (req,res){
        Thought.findOneAndRemove(
            {_id: req.params.thoughtId}
        )
        .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thought with this id' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { runValidators: true, new: true }
        ))
        .then((userData) =>  !userData
        ? res.status(404).json({ message: 'No user found with that id' })
        : res.json(thoughtData)
    )
    .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) { //add reaction by id 
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thoughtData) =>
            !thoughtData
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(video)
          )
          .catch((err) => res.status(500).json(err));
      },
      
      removeReaction(req, res) { //remove reaction by id 
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thoughtData) =>
            !thoughtData
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thoughtData)
          )
          .catch((err) => res.status(500).json(err));
      } 
} 