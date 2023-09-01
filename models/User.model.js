import mongoose from "mongoose";

const UserSchema = new mongoose.Schema ({
    fullName: {type: String, required: true},
    passwordHash: {type: String, required: true},
    email: {unique: true, required: true, type: String},
    avatarUrl: String,
    
},{ timestamps: true },)

export default mongoose.model('User', UserSchema)