import mongoose from 'mongoose';
import { genSalt , hash } from 'bcrypt';

const UserSchema = new mongoose.Schema({
    email : {
        type : String, 
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    firstName : {
        type : String,
        required : false,
    },
    lastName:{
        type : String,
        required : false,
    },
    profileSetup:{
        type:Boolean,
        required:false,
        default:false,
    },
    otp: {
        type: String,
        required: false,
    },
    otpExpires: {
        type: Date,
        required: false,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
});


// Pre-save hook to hash password only if it's new or modified
UserSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        next();
    } catch (err: any) {
        next(err);
    }
});

const User = mongoose.model('User', UserSchema);

export default User;