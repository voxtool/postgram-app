const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    people: [{
        type: String
    }],
    messages: [
        {
            sender: { type: String }, message: { type: String }
        }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Room', RoomSchema);