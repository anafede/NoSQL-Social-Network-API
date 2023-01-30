const {User, Thought} = require ('../models');

module.exports = {
    getAllUsers(req, res){
        User.find()
        .then(userData => 
            res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
             })
        },
    getUserById(req, res) {   //get user by id 
        User.findOne({ _id: req.params.userId})
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((userData) =>
            ! userData
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(userData)
          )
          .catch((err) => res.status(500).json(err));
    }, 
    createUser (req, res){ //create user
        User.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    }, 
    updateUser(req, res){ //update user by id 
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((userData) =>
        !userData
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(userData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    }, 

    deleteUser(req, res){
        User.findOneAndDelete({ _id: req.params.userId})
        .then((userData) =>
        !userData
        ? res.status(404).json({ message: 'No user with that ID' })
        : Thought.deleteMany({ _id: { $in: userData.thoughts } }))
        .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res){
        User.findOneAndUpdate(
            {_id: req.params.friendId },
            {$addtoSet: {friends: req.params.friendId}},
            {runvalidators: true, new: true}
            )
            .then((userData) =>
            !userData
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(userData)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res){
        User.findOneandUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {runValidators: true, new: true}
        )
        .then((userData) =>
        !userData
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(userData)
    )
    .catch((err) => res.status(500).json(err));
    }

    };
