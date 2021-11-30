const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    img:{type:String,default:"https://res.cloudinary.com/dzqnxqgjw/image/upload/v1589788981/default_user_profile_picture_uqxzqz.png"},
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);