const { Image } = require('../models');
const { User } = require('../models');

async function getImages(req, res, next) {
    const { pageSize, page } = req.params;
    const user = req.user;
    try {
        const images = await Image.find({ userId: { $in: user.followed } }).sort({ created_at: -1 }).populate('userId', 'username').limit(Number(pageSize)).skip((Number(page) - 1) * Number(pageSize));
        res.json(images);
    } catch (err) {
        next(err);
    }
}

async function getImage(req, res, next) {
    const { imageId } = req.params;
    try {
        const image = await Image.findById(imageId).populate({ path: 'comments', populate: { path: 'userId', select: 'username' } })
        res.json(image);
    } catch (err) {
        next(err);
    }
}

async function postImage(req, res, next) {
    const { imageUrl, description } = req.body;
    const { _id: userId } = req.user;

    try {
        const image = await Image.create({ imageUrl, description, userId });
        await User.updateOne({ _id: userId }, { $addToSet: { images: image._id } }, { new: true })
        res.status(200).json(image)
    } catch (err) {
        next(err);
    }
}

async function deleteImage(req, res, next) {
    const { imageId } = req.params;
    const { _id: userId } = req.user;

    try {
        const deleted = await Image.findOneAndDelete({ _id: imageId });
        await User.updateOne({ _id: userId }, { $pull: { images: imageId } }, { new: true });
        res.status(200).json(deleted);
    } catch (err) {
        next(err);
    }
}

async function like(req, res, next) {
    const imageId = req.params.imageId;
    const { _id: userId } = req.user;
    try {
        const image = await Image.findByIdAndUpdate({ _id: imageId }, { $addToSet: { likes: userId } }, { new: true }).populate('userId', 'username');
        res.status(200).json(image);
    } catch (err) {
        next(err);
    }
}

async function unlike(req, res, next) {
    const imageId = req.params.imageId;
    const { _id: userId } = req.user;
    try {
        const image = await Image.findByIdAndUpdate({ _id: imageId }, { $pull: { likes: userId } }, { new: true }).populate('userId', 'username');
        res.status(200).json(image);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getImages,
    getImage,
    postImage,
    like,
    deleteImage,
    unlike
}