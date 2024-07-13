const mongoose = require('mongoose');
const Post = require('../Post/Post')
// create a schema


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'First name is required']
    },
    lastname: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    profilePhoto: {
        type: String,
        default: 'default.jpg'
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['Admin', 'Guest', 'Editor'],
        required: [true, 'role is required'],
        default: 'Editor'
    },
    viewers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    blocked: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    // plan: {
    //     type: String,
    //     enum: ['Free', 'Premium', 'Pro'],
    //     default: 'Free'
    // },
    userAward: {
        type: String,
        enum: ['Bronze', 'Silver', 'Gold'],
        default: 'Bronze'
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }

);
// HOOKS
// PRE-BEFORE RECORD IS SAVED
userSchema.pre('findOne', async function (next) {
    try {
        // populate the post
        this.populate({
            path: 'posts',
        });

        // get the user id
        const userId = this._conditions._id;

        // find the post create by the user
        const posts = await Post.find({ user: userId });

        // check if the post is found
        const lastPost = posts[posts.length - 1];

        // get the last post date
        const lastPostDate = new Date(lastPost?.createdAt);

        // get the last post date in string format
        const lastPostDateString = lastPostDate.toDateString();

        // add virtuals to the schema
        userSchema.virtual('lastPost').get(function () {
            return lastPostDateString;
        });

        // Check if user is inactive for 30 days
        const currentDate = new Date();
        const diff = currentDate - lastPostDate;
        const diffInDays = diff / (1000 * 60 * 60 * 24);

        // if (diffInDays > 30) {
        //     // set the user to inactive
        //     userSchema.virtual('isInActive').get(function () {
        //         return true;
        //     });
        //     // find the user by id and set the user to inactive
        //     await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true, runValidators: true });
        // } else {
        //     userSchema.virtual('isInActive').get(function () {
        //         return false;
        //     });
        //     // find the user by id and set the user to inactive
        //     await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true, runValidators: true });
        // }

        // Last active Date
        const daysAgo = Math.floor(diffInDays);

        // add virtual to the schema
        userSchema.virtual('lastActive').get(function () {
            // check if  daysAgo is less than 0
            if (daysAgo < 0) {
                return 'Today';
            }
            if (daysAgo === 1) {
                return 'yesterday';
            }
            // check if ago is greater than 1
            if (daysAgo > 1) {
                return `${daysAgo} days ago`;
            }
            return daysAgo;
        });

        // update userAward based on the number of posts
        const numberOfPost = posts.length;

        if (numberOfPost < 10) {
            // set the user award to bronze
            await User.findByIdAndUpdate(userId, { userAward: 'Bronze' }, { new: true });
        } else if (numberOfPost > 10 && numberOfPost <= 20) {
            // set the user award to silver
            await User.findByIdAndUpdate(userId, { userAward: 'Silver' }, { new: true });
        } else if (numberOfPost > 20) {
            // set the user award to gold
            await User.findByIdAndUpdate(userId, { userAward: 'Gold' }, { new: true });
        }

        next();
    } catch (error) {
        next(error);
    }
});



// GET FULLNAME
userSchema.virtual('fullname').get(function () {
    return `${this.firstname} ${this.lastname}`;
});

// get post count
userSchema.virtual('initials').get(function () {
    return `${this.firstname[0]}${this.lastname[0]}`;
});


// GET USER INITIALS
userSchema.virtual('postCounts').get(function () {
    return this.posts.length;
});

// get followers count 
userSchema.virtual('followersCount').get(function () {
    return this.followers.length;
});

// get following count 
userSchema.virtual('followersCount').get(function () {
    return this.following.length;
});

// get viewers count 
userSchema.virtual('viewersCount').get(function () {
    return this.viewers.length;
});

// get blocked count
userSchema.virtual('blockCount').get(function () {
    return this.blocked.length;
});

const User = mongoose.model('User', userSchema);
module.exports = User;