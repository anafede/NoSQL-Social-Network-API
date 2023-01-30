const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend

} = require('../../controllers/userController')

//api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

//api/users:id
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser) //update by id
    .delete(deleteUser); //delete by id 

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;