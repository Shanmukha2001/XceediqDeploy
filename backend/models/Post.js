const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    description: String,
    imageUrl: String,
    likes: { type: Number, default: 0 },
    liked: { type: Boolean, default: false },
    userId: String
});

module.exports = mongoose.model('Post', postSchema);
