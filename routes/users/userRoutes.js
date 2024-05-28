const express = require('express');
const {
    userRegisterCtrl,
    userLoginCtrl,
    userGetOneCtrl,
    userGetAllCtrl,
    updateUserCtrl,
    deleteUserCtrl,
    userLogoutCtrl
} = require('../../controllers/users/userCtrl');

const userRouter = express.Router();

//POST/api/v1/users/register
userRouter.post('/register', userRegisterCtrl);

//POST/api/v1/users/login
userRouter.post('/login', userLoginCtrl);

//GET/api/v1/users/:id
userRouter.get('/profile/:id', userGetOneCtrl);

//GET/api/v1/users
userRouter.get('/', userGetAllCtrl);

//PUT/api/v1/users/:id
userRouter.put('/:id', updateUserCtrl);

//DELETE/api/v1/users/:id
userRouter.delete('/:id', deleteUserCtrl);

//GET/api/v1/users/logout
userRouter.get('/logout', userLogoutCtrl);

module.exports = userRouter