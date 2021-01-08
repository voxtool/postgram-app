const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: [150, 'The comment should be less than 150 characters long.']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Comment', commentSchema);