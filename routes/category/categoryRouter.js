const express = require('express');
const categoryRouter = express.Router();
const {
    CreateCategoryPost,
    categoryGetOneCtrl,
    categoryGetAll,
    categoryUpdateCtrl,
    categoryDelete,
    fetchCategoryCtrl
} = require('../../controllers/category/categoryCtrl');
isLogin = require('../../middleware/isLogin');

//POST/api/v1/category
categoryRouter.post('/', CreateCategoryPost);

//GET/api/v1/category/:id
categoryRouter.get('/:id', categoryGetOneCtrl);

//GET/api/v1/category
categoryRouter.get('/', fetchCategoryCtrl);

//PUT/api/v1/category/:id
categoryRouter.put('/:id',isLogin, categoryUpdateCtrl);

//DELETE/api/v1/category/:id
categoryRouter.delete('/:id', categoryDelete);

module.exports = categoryRouter;
