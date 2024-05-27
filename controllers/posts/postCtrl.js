const postCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'post created successfully'
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
    postCtrl,
    postGetOneCtrl,
    postGetAllCtrl,
    postUpdateCtrl,
    postDeleteCtrl
}