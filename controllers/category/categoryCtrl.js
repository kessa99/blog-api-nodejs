const Category = require('../../model/Category/Category')
const { appErr } = require('../../utils/appErr');

const CreateCategoryPost = async (req, res, next) => {
    const {} = req.body;
    try {
        const category = await Category.create({title, user: req.userAuth})
        res.json({
            status: 'success',
            data: category
        })
    } catch (err) {
        return next(appErr(err.message))
    }
};

const categoryGetOneCtrl = async (req, res) => {
    try {
        const categories = await Category.findById(req.params.id)
        res.json({
            status: 'success',
            data: categories
        })
    } catch (err) {
        return next(appErr(err.message))
    }
};

const fetchCategoryCtrl = async (req, res) => {
    try {
        const categories = await Category.find()
        res.json({
            status: 'success',
            data: categories,
        })
    } catch (err) {
        return next(appErr(err.message))
    }
};

const categoryUpdateCtrl = async (req, res) => {
    const {title} = req.body;
    try {
        const categories = await Category.findByIdAndUpdate(req.params.id, {title}, {new: true})
        res.json({
            status: 'success',
            data: categories
        })
    } catch (err) {
        return next(appErr(err.message))
    }
};

const categoryDelete = async (req, res) => {
    try {
        res.json({
            status: 'success',
            message: 'category deleted successfully'
        })
    } catch (err) {
        return next(appErr(err.message))
    }
};

module.exports = {
    CreateCategoryPost,
    categoryGetOneCtrl,
    fetchCategoryCtrl,
    categoryUpdateCtrl,
    categoryDelete
}