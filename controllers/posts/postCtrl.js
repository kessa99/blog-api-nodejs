const Post = require('../../models/Post/Post');
const User = require('../../models/User/User');


// create a post
const createpostCtrl = async(req, res, next) => {
    const {tittle, description, category} = req.body;
    try{
        // 1.find the user who creating the post
        const author = await User.findById(req.user._id);
        // check if user is blocked
        if(author.blocked){
            return next(appErr('You are blocked Access Denied'));
        }
        // 2. create a post
        const postCreated = await Post.create({
            title,
            description,
            user: author._id,
            category,
        });
        // Associat user to a post -Push the post into the user posts field
        author.posts.push(postCreated._id);
        // save the user
        await author.save();
        res.json({
            status: 'success',
            data: postCreated,
        })
    } catch(err){
        next(appErr(err.message));
    }
};

const postGetOneCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'post fetched successfully'
        })
    } catch(err){
        next(appErr(err.message));
    }
}

// get all posts
const getAllPostCtrl = async(req, res, next) => {
    try{
        // find all posts
        const posts = await Post.find({}).populate('user').populate('category', 'title');

        // chack is the logged in user is blocked by the post owner
        const postsFiltered = posts.filter(post => {
            // get all blocked users
            const blockedUsers = post.user.blockedUsers;
            const isBlocked = blockedUsers.includes(req.userAuth);
            // if user is blocked return null(so no post show)
            // return isBlocked ? null: post; or return !isBlocked;
            // or
            return !isBlocked;
        });
        res.json({
            status: 'success',
            data: posts
        })
    } catch(err){
        next(appErr(err.message));
    }
}

// tooglelike
const toogleLikePostCtrl = async(req, res, next) => {
    try{
        // get the post
        const post = await Post.findById(req.params.id);
        // check if the user has already liked the post
        const isLiked = post.likes.includes(req.userAuth);
        // if the user has liked the post remove the like
        if(isLiked){
            // differnce between !== and !=
            // post.likes = post.filter(like => like.toString() !== req.userAuth.toString());
            post.likes = post.filter(like => like != req.userAuth);
            await post.save();
        } else {
            // if the user has not liked the post add the like
            post.likes.push(req.userAuth);
            await post.save();
        }
        res.json({
            status: 'success',
            data: 'like toogled successfully'
        })
    } catch(err){
        next(appErr(err.message));
    }
}

const postUpdateCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'post updated successfully'
        })
    } catch(err){
        next(appErr(err.message));
    }
}

const postDeleteCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'post deleted successfully'
        })
    } catch(err){
        next(appErr(err.message));
    }
}

module.exports = {
    createpostCtrl,
    postGetOneCtrl,
    getAllPostCtrl,
    postUpdateCtrl,
    postDeleteCtrl,
    toogleLikePostCtrl,
}