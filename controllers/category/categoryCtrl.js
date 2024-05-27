const categoryPost = async (req, res) => {
    try {
        res.json({
            status: 'success',
            message: 'category created successfully'
        })
    } catch (err) {
        res.json({
            status: 'Error in creating category',
            message: err.message
        })
    }
};

const categoryGetOne = async (req, res) => {
    try {
        res.json({
            status: 'success',
            message: 'category fetched successfully'
        })
    } catch (err) {
        res.json({
            status: 'Error in fetching category',
            message: err.message
        })
    }
};

const categoryGetAll = async (req, res) => {
    try {
        res.json({
            status: 'success',
            message: 'All category fetched successfully'
        })
    } catch (err) {
        res.json({
            status: 'Error in fetching all category',
            message: err.message
        })
    }
};

const categoryUpdate = async (req, res) => {
    try {
        res.json({
            status: 'success',
            message: 'category updtae successfully'
        })
    } catch (err) {
        res.json({
            status: 'Error in updating post',
            message: err.message
        })
    }
};

const categoryDelete = async (req, res) => {
    try {
        res.json({
            status: 'success',
            message: 'category deleted successfully'
        })
    } catch (err) {
        res.json({
            status: 'Error in deleting category',
            message: err.message
        })
    }
};

module.exports = {
    categoryPost,
    categoryGetOne,
    categoryGetAll,
    categoryUpdate,
    categoryDelete
}