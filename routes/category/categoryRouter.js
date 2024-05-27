const express = require('express');
const categoryRouter = express.Router();
const {
    categoryPost,
    categoryGetOne,
    categoryGetAll,
    categoryUpdate,
    categoryDelete
} = require('../../controllers/category/categoryCtrl');

//POST/api/v1/category
categoryRouter.post('/', categoryPost);

//GET/api/v1/category/:id
categoryRouter.get('/:id', categoryGetOne);

//GET/api/v1/category
categoryRouter.get('/', categoryGetAll);

//PUT/api/v1/category/:id
categoryRouter.put('/:id', categoryUpdate);

//DELETE/api/v1/category/:id
categoryRouter.delete('/:id', categoryDelete);

module.exports = categoryRouter;
