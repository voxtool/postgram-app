const { User, Image, Comment } = require('../models');


async function createComment(req, res, next) {
    const { imageId } = req.params;
    const { _id: userId } = req.user;
    const { text } = req.body;

    try {
        const comment = await Comment.create({ text, userId, imageId });
        await User.updateOne({ _id: userId }, { $push: { comments: comment._id } });
        await Image.updateOne({ _id: imageId }, { $push: { comments: comment._id } }, { new: true });
        res.status(200).json(comment);
    } catch (err) {
        next(err);
    }
}


async function deleteComment(req, res, next) {
    const { commentId, imageId } = req.params;
    const { _id: userId } = req.user;

    try {
        const deleted = await Comment.findOneAndDelete({ _id: commentId, userId });
        await User.updateOne({ _id: userId }, { $pull: { comments: commentId } });
        await Image.updateOne({ _id: imageId }, { $pull: { comments: commentId } });
        if (deleted) {
            res.status(200).json(deleted)
        } else {
            res.status(401).json({ message: `Not allowed!` });
        }
    } catch (err) {
        next(err)
    }
}


module.exports = {
    createComment,
    deleteComment
}