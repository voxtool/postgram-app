const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALTROUNDS) || 10;


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'The email should be at least 5 characters long.'],
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: 'Please fill a valid email address'
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'The username should be at least 3 characters long.'],
        validate: {
            validator: function (username) {
                return /[a-zA-Z0-9]+/g.test(username);
            },
            message: props => `${props.value} must contain only latin letters and digits.`
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'The password should be at least 6 characters long.'],
        validate: {
            validator: function (password) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/g.test(password);
            },
            message: props => `${props.value} must contain at least one uppercase letter, one lowercase letter and one number.`
        },
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    }],
    followed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, { timestamps: { createdAt: 'created_at' } });

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre('save', function (next) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            next(err);
        }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) {
                next(err);
            }
            this.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);