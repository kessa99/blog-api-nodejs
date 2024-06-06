const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const storage = require('../../config/cloudinary');

const postRouter = express.Router();

// multer
const multer = require('multer');
const upload = multer({ storage });

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
postRouter.post('/', isLogin, upload.single('image'), createpostCtrl);

//GET/api/v1/posts/:id
postRouter.get('/:id', isLogin, postGetOneCtrl);

//GET/api/v1/posts
postRouter.get('/',isLogin ,getAllPostCtrl);

//GET/api/v1/posts
postRouter.get('/likes/:id', isLogin ,toogleLikePostCtrl);

//GET/api/v1/posts
postRouter.get('/dislike/:id', isLogin ,toogleDisLikePostCtrl);

//GET/api/v1/posts/detail/:id
postRouter.get('/detail/:id',isLogin ,postDetailsCtrl);

//PUT/api/v1/posts/:id
postRouter.put('/:id',isLogin, postUpdateCtrl);

//DELETE/api/v1/posts/:id
postRouter.delete('/:id', isLogin, upload.single('image'), postDeleteCtrl);

module.exports = postRouter;