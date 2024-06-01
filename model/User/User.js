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
// HOOKS
// PRE-BEFORE RECORD IS SAVED
userSchema.pre('findOne', function(next){
    // get the user id
    const userId = this._conditions._id;
    // find the post create by the user
    const posts = await Post.find({user: userId});
    // check if the post is found
    const lastPost = posts[posts.length - 1];
    // get the last post date
    const lastPostDate = new Date(lastPost.createdAt);
    // get the last post date u string format
    const lastPostDateString = lastPostDate.toDateString();
    // add virtuals to the schema
    userSchema.virtual('lastPost').get(function(){
        return lastPostDateString;
    });
    console.log(lastPostDateString);
    next();
});
// POST -AFTER SAVING
userSchema.post('save', function(doc, next){
    console.log('look hook')
    next();
});

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