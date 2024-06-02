const express = require('express');

const commentRouter = express.Router();

const {
    commentCtrl,
    commentGetOneCtrl,
    commentGetAllCtrl,
    commentUpdateCtrl,
    commentDeleteCtrl
} = require('../../controllers/comments/commentCtrl');
const isLogin = require('../../middlewares/isLogin');

//POST/api/v1/comments
commentRouter.post('/:id', isLogin, commentCtrl);

//GET/api/v1/comments/:id
commentRouter.get('/:id', commentGetOneCtrl);

//GET/api/v1/comments
commentRouter.get('/', commentGetAllCtrl);

//PUT/api/v1/users/:id
commentRouter.put('/:id',isLogin, commentUpdateCtrl);

//DELETE/api/v1/comments/:id
commentRouter.delete('/:id', commentDeleteCtrl);

module.exports = commentRouter;