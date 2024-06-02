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

const postGetAllCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'All posts fetched successfully'
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
    postGetAllCtrl,
    postUpdateCtrl,
    postDeleteCtrl
}