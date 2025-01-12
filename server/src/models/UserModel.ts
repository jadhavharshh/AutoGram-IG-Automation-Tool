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


UserSchema.pre("save", async function (next) {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
})

const User = mongoose.model('User', UserSchema);

export default User;