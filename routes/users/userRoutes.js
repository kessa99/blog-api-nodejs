const express = require('express');
const {
    userRegisterCtrl,
    userLoginCtrl,
    userGetOneCtrl,
    userGetAllCtrl,
    updateUserCtrl,
    deleteUserCtrl,
    userLogoutCtrl,
    profilePhototoUploadCtrl,
    whoViewMyProfileCtrl,
    followingCtrl,
} = require('../../controllers/users/userCtrl');
const storage = require('../../config/cloudinary');

const multer = require('multer');

const isLogin = require('../../middlewares/isLogin');
const userRouter = express.Router();

// instance of multer
const upload = multer({ storage })

//POST/api/v1/users/register
userRouter.post('/register', userRegisterCtrl);

//POST/api/v1/users/login
userRouter.post('/login', userLoginCtrl);

//GET/api/v1/users/:id
userRouter.get('/profile/', isLogin, userGetOneCtrl);

//GET/api/v1/users
userRouter.get('/', userGetAllCtrl);

//PUT/api/v1/users/:id
userRouter.put('/:id', updateUserCtrl);

//POST/api/v1/users/profile-photo-upload
userRouter.post('/profile-photo-upload', upload.single('profile-based'), isLogin, profilePhototoUploadCtrl);

//DELETE/api/v1/users/:id
userRouter.delete('/:id', deleteUserCtrl);

//GET/api/v1/users/logout
userRouter.get('/logout', userLogoutCtrl);

//GET/api/v1/users/who-view-my-profile/id
userRouter.get('/who-view-my-profile/:id',isLogin , whoViewMyProfileCtrl);

//GET/api/v1/users/following/id
userRouter.get('/following/:id',isLogin , followingCtrl);

module.exports = userRouter