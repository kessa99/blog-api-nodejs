const express = require('express');
const isLogin = require('../../middlewares/isLogin');

const postRouter = express.Router();

const {
    createpostCtrl,
    postGetOneCtrl,
    postGetAllCtrl,
    postUpdateCtrl,
    postDeleteCtrl
} = require('../../controllers/posts/postCtrl');

//POST/api/v1/posts
postRouter.post('/',isLogin ,createpostCtrl);

//GET/api/v1/posts/:id
postRouter.get('/:id', postGetOneCtrl);

//GET/api/v1/posts
postRouter.get('/', postGetAllCtrl);

//PUT/api/v1/posts/:id
postRouter.put('/:id', postUpdateCtrl);

//DELETE/api/v1/posts/:id
postRouter.delete('/:id', postDeleteCtrl);

module.exports = postRouter;