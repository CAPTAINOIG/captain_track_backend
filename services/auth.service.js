const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");
const User = require("../models/user.model");
const emailService = require("./email.service");
const logger = require("../utils/logger");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

class AuthService {
  generateToken(user) {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn },
    );
  }

  async register(userData) {
    const { name, email, password, profilePicture, username } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePicture,
      username,
    });
    setImmediate(async () => {
      try {
        await emailService.sendWelcomeEmail(email, name);
      } catch (err) {
        logger.error("Welcome email failed (background):", err);
      }
    });
    const token = this.generateToken(user);
    return {
      token,
      user: user.toJSON(),
    };
  }

  async login(email, password) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("User not found");
    }
    const isValid = await user.validatePassword(password);
    if (!isValid) {
      throw new Error("Invalid password");
    }
    const token = this.generateToken(user);
    return {
      token,
      user: user.toJSON(),
    };
  }

  async uploadPicture(userId, base64Image) {
    try {
      console.log('uploadPicture - Starting upload for userId:', userId);
      console.log('uploadPicture - base64Image length:', base64Image ? base64Image.length : 'undefined');
      
      const uploadResult = await cloudinary.uploader.upload(base64Image, {
        folder: "profiles",
        transformation: [
          { width: 400, height: 400, crop: "fill" },
          { quality: "auto" },
        ],
      });
      
      console.log('uploadPicture - Cloudinary upload successful:', uploadResult.secure_url);
      
      const user = await User.findByIdAndUpdate(
        userId,
        { profilePicture: uploadResult.secure_url },
        { new: true },
      ).select("-password");
      
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error('uploadPicture - Error:', error);
      throw error;
    }
  }

  async updateUserProfile (userId, userData) {
    const user = await User.findByIdAndUpdate(userId, userData, { new: true });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

    async getUserById(userId) {
    const user = await User.findById(userId).select('-password').lean();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

}


module.exports = new AuthService();
