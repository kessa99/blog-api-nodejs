const Comment = require('../../model/Comment/Comment');
const user = require('../../model/User/User');
const post = require('../../model/Post/Post');
const { appErr } = require('../../utils/appErr');

// create comment
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

// update
const commentUpdateCtrl = async(req, res, next) => {
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

// delete
const commentDeleteCtrl = async(req, res, next) => {
    try{
        //find the comment
        const comments = await Comment.findById(req.params.id);
        if(comments.user.toString() !== req.userAuth) {
            return next(appErr('You are not allowed to update this comment'));
        }
        await comments.findByIdAndDelete(req.params.id);
        res.json({
            status: 'success',
            message: 'comment deleted successfully'
        })
    } catch(err){
        next(appErr(err.message));
    }
};


module.exports = {
    commentCtrl,
    commentUpdateCtrl,
    commentDeleteCtrl
}