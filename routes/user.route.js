const express = require('express');
const { registerUser, userLogin, uploadProfilePicture, fetchProfilePicture, updateUserProfile, getUserProfile } = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

// Public routes
router.post('/register', registerUser)
router.post('/login', userLogin)

// Protected routes
router.use(auth);
router.post('/profilePicture', uploadProfilePicture)
router.get('/getProfilePicture', fetchProfilePicture)
router.put('/updateProfile', updateUserProfile)
router.get('/getProfile', getUserProfile)

module.exports = router;