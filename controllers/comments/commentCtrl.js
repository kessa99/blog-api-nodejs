const Comment = require('../../models/Comment/Comment');
const user = require('../../models/User/User');
const post = require('../../models/Post/Post');
const { appErr } = require('../../utils/appErr');

// create
const commentCtrl = async(req, res, next) => {
    const { description } = req.body;
    try{
        // find post
        const post = await post.findById(req.params.id);
        // creatte comment
        const comment = await Comment.create({
            // post: post._id,
            post: req.params.id,
            user: req.userAuth,
            description
        });
        // find user
        const user = await user.findById(req.userAuth);
        // push the comment to post
        post.comments.push(comment._id);
        // push the comment to user
        user.comments.push(comment._id);
        // save
        // disable validation
        await post.save(validateBeforeSave = false);
        await user.save(validateBeforeSave = false);

        res.json({
            status: 'success',
            data: comment
        })
    } catch(err){
        next(new appErr(err.message));
    }
};

const commentGetOneCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'comment fetched successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in fetching comment',
            message: err.message
        })
    }
};

const commentGetAllCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'All comments fetched successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in fetching all comments',
            message: err.message
        })
    }
};

const commentUpdateCtrl = async(req, res) => {
    const {description} = req.body;
    try {
        //find the comment
        const comments = await Comment.findById(req.params.id);
        if(comments.user.toString() !== req.userAuth) {
            return next(appErr('You are not allowed to update this comment'));
        }
        const comment = await Comment.findByIdAndUpdate(
            req.params.id, 
            {description}, 
            {new: true, runValidators: true},
        )
        res.json({
            status: 'success',
            data: comment
        })
    } catch (err) {
        return next(appErr(err.message))
    }
};

const commentDeleteCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'comment deleted successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in deleting comment',
            message: err.message
        })
    }
};


module.exports = {
    commentCtrl,
    commentGetOneCtrl,
    commentGetAllCtrl,
    commentUpdateCtrl,
    commentDeleteCtrl
}