const commentCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'comment created successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in creating comment',
            message: err.message
        })
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
    try{
        res.json({
            status: 'success',
            message: 'comment updated successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in updating comment',
            message: err.message
        })
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