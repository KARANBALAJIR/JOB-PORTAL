const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'first name is required'],
        trim: true,
        maxlength: 32
    },
    lastName: {
        type: String,
        required: [true, 'last name is required'],
        trim: true,
        maxlength: 32
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        unique: true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        trim: true,
        minlength: [6, 'password must be at least 6 characters long']
    },
    role: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

//encrypt password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model('User', userSchema);