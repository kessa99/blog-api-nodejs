const express = require('express');
const categoryRouter = express.Router();
const {
    CreateCategoryPost,
    categoryGetOneCtrl,
    fetchCategoryCtrl,
    categoryUpdateCtrl,
    deleteCategoryCtrl,
} = require('../../controllers/category/categoryCtrl');
isLogin = require('../../middlewares/isLogin');

//POST/api/v1/category
categoryRouter.post('/', CreateCategoryPost);

//GET/api/v1/category/:id
categoryRouter.get('/:id', categoryGetOneCtrl);

//GET/api/v1/category
categoryRouter.get('/', fetchCategoryCtrl);

//PUT/api/v1/category/:id
categoryRouter.put('/:id',isLogin, categoryUpdateCtrl);

//DELETE/api/v1/category/:id
categoryRouter.delete('/:id',isLogin, deleteCategoryCtrl);

module.exports = categoryRouter;
