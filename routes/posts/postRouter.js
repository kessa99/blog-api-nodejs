const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const storage = require('../../config/cloudinary');

const postRouter = express.Router();

// multer
const multer = require('multer');

const {
    createpostCtrl,
    postGetOneCtrl,
    getAllPostCtrl,
    postUpdateCtrl,
    postDeleteCtrl,
    toogleLikePostCtrl,
    toogleDisLikePostCtrl,
    postDetailsCtrl,
} = require('../../controllers/posts/postCtrl');

// file upload middleware

//POST/api/v1/posts
postRouter.post('/',isLogin,upload.single('image') ,createpostCtrl);

//GET/api/v1/posts/:id
postRouter.get('/:id', postGetOneCtrl);

//GET/api/v1/posts
postRouter.get('/',isLogin ,getAllPostCtrl);

//GET/api/v1/posts
postRouter.get('like/:id' ,toogleLikePostCtrl);

//GET/api/v1/posts
postRouter.get('dislike/:id' ,toogleDisLikePostCtrl);

//GET/api/v1/posts
postRouter.get('detail/:id',isLogin ,postDetailsCtrl);

//PUT/api/v1/posts/:id
postRouter.put('/:id', postUpdateCtrl);

//DELETE/api/v1/posts/:id
postRouter.delete('/:id', postDeleteCtrl);

module.exports = postRouter;