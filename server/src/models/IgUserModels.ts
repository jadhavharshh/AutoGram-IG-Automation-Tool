import mongoose from 'mongoose';

const IGUserSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User',
        required: true,
    },
    igUsername: {
        type: String,
        required: true,
        unique: true, // Ensure uniqueness for Instagram usernames
    },
    igPassword: {
        type: String, // Storing plain text (use with caution)
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const IGUser = mongoose.model('IGUser', IGUserSchema);

export default IGUser;
