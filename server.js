// import express
const express = require('express');


//import mongoose
const mongoose = require('mongoose');

//import dotenv
const dotenv = require('dotenv');

//import routes
// ./routes/users/userRoutes.js
const userRouter = require('./routes/users/userRoutes');
const postRouter = require('./routes/posts/postRouter');
const commentRouter = require('./routes/comment/commentRouter');
const categoryRouter = require('./routes/category/categoryRouter');

const globalErrorHandler = require('./middlewares/globalErrorHandler');

dotenv.config();
require('./config/dbConnect');
const app = express();

// middleware
app.use(express.json());

// const userAuth = {
//     isLogin: true,
//     isAdmin: false,
// }

// app.use((req, res, next) => {
//     if (userAuth.isLogin) {
//         next();
//     } else {
//         res.json({
//             message: 'You are not login'
//         });
//     }
// });




// ROUTES
app.use('/api/v1/users/', userRouter);
app.use('/api/v1/posts/', postRouter);
app.use('/api/v1/comments/', commentRouter);
app.use('/api/v1/category/', categoryRouter);

//Error handlers middelware
app.use(globalErrorHandler);


// 404 error
app.use('*', (req, res) => {
    res.status(404).json({
        message: `${req.originalUrl} - 404 Route Not Found`
    });
});


//listen server
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});