const Post = require('../../models/Post/Post');
const User = require('../../models/User/User');


// create a post
const createpostCtrl = async(req, res) => {
    const {tittle, description} = req.body;
    try{
        // 1.find the user who creating the post
        const author = await User.findById(req.user._id);
        // 2. create a post
        const postCreated = await Post.create({
            title,
            description,
            user: author._id
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
        res.json({
            status: 'Error in creating post',
            message: err.message
        })
    }
};

const postGetOneCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'post fetched successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in fetching post',
            message: err.message
        })
    }
}

const postGetAllCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'All posts fetched successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in fetching all posts',
            message: err.message
        })
    }
}

const postUpdateCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'post updated successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in updating post',
            message: err.message
        })
    }
}

const postDeleteCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'post deleted successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in deleting post',
            message: err.message
        })
    }
}

module.exports = {
    createpostCtrl,
    postGetOneCtrl,
    postGetAllCtrl,
    postUpdateCtrl,
    postDeleteCtrl
}