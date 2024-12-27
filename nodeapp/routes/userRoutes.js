const express = require('express');
const { verifyToken} = require('../middleware/verifyToken')
const { getAllUsers, getUserById, createUser, updateStatusUser, updateUser, deleteUser, changeUserRole ,loginUser} = require('../controllers/userController');
const router = express.Router();

router.get('/users', getAllUsers);
router.post('/login', loginUser);
router.get('/users/:id', verifyToken,getUserById);
router.post('/user', createUser);
router.put('/users/:id',verifyToken, updateUser);
router.delete('/users/:id', verifyToken,deleteUser);
router.patch('/users/:id/role', verifyToken,changeUserRole);
router.patch('/user/:id/status',verifyToken,updateStatusUser);

module.exports = router;