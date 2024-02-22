const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

exports.signup = async (req, res, next) => {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new ErrorResponse('Email is already taken', 400));
    }
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, user });
    } catch (error) {
        next(error);
    }
}

exports.signin = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        // Validate email and password
        if (!email || !password) {
            return next(new ErrorResponse('Please provide email and password', 400));
        }
        if (!userExist) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }
        // Check for user
        const user = await User.findOne ({ email }).select('+password');
        if (!user) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }
        // Check if password matches
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }

        // Create token
        const token = user.getSignedJwtToken();

    } catch (error) {
        next(error);
    }
}