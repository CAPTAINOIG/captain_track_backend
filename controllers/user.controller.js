const AuthService = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler");
const ResponseHandler = require("../utils/responseHandler");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, username } = req.body;
  const result = await AuthService.register({ name, email, password, username });
  ResponseHandler.created(res, result, 'User Created Successfully');
})

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await AuthService.login(email, password);
  ResponseHandler.success(res, result, 'User Login Successfully');
})

const uploadProfilePicture = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get from auth middleware instead of body
  console.log('uploadProfilePicture - req.body:', req.body);
  const { profilePicture } = req.body;
  const result = await AuthService.uploadPicture(userId, profilePicture)
  ResponseHandler.success(res, result, 'Picture uploaded successfully');
})

const fetchProfilePicture = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get from auth middleware instead of query
  const user = await AuthService.getUserById(userId);
  ResponseHandler.success(res, { url: user.profilePicture }, 'Profile picture retrieved');
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get from auth middleware
  const userData = req.body; // Get from request body
  const result = await AuthService.updateUserProfile(userId, userData)
  ResponseHandler.success(res, result, 'Profile updated');
})

const getUserProfile = asyncHandler(async (req, res) =>{
  const userId = req.user._id; 
  const user = await AuthService.getUserById(userId);
  ResponseHandler.success(res, user, 'Profile retrieved');
})

module.exports = { registerUser, userLogin, uploadProfilePicture, fetchProfilePicture, updateUserProfile, getUserProfile }