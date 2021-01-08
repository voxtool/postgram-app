const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: [250, 'The description should be less than 250 characters long.']
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Image', ImageSchema);