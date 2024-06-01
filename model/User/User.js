const mongoose = require('mongoose');
// create a schema


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required:[true, 'First name is required']
    },
    lastname: {
        type: String,
        required:[true, 'Last name is required']
    },
    email: {
        type: String,
        required:[true, 'Email is required']
    },
    profilePhoto: {
        type: String,
        default: 'default.jpg'
    },
    password: {
        type: String,
        required:[true, 'Password is required']
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
        enum: ['Admin', 'Guest', 'Editor']
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
    userAward:{
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

// GET FULLNAME
userSchema.virtual('fullname').get(function(){
    return `${this.firstname} ${this.lastname}`;
});

// get post count
userSchema.virtual('initials').get(function(){
    return this.posts.length;
});


// GET USER INITIALS
userSchema.virtual('postCounts').get(function(){
    return `${this.firstname[0]}${this.lastname[0]}`;
});

// get followers count 
userSchema.virtual('followersCount').get(function(){
    return this.followers.length;
});

// get following count 
userSchema.virtual('followersCount').get(function(){
    return this.following.length;
});

// get viewers count 
userSchema.virtual('viewersCount').get(function(){
    return this.viewers.length;
});

// get blocked count
userSchema.virtual('blockCount').get(function(){
    return this.blocked.length;
});

const User = mongoose.model('User', userSchema);
module.exports = User;