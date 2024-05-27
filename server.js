
// import express
const express = require('express');

//import mongoose
const mongoose = require('mongoose');

//import dotenv
const dotenv = require('dotenv');

//import routes
const userRouter = require('./routes/users/userRoutes');
const postRouter = require('./routes/posts/postRouter');
const commentRouter = require('./routes/comment/commentRouter');
const categoryRouter = require('./routes/category/categoryRouter');


dotenv.config();
require('./config/dbConnect');
const app = express();

// middleware


// ROUTES
app.use('/api/v1/users/', userRouter);
app.use('/api/v1/posts/', postRouter);
app.use('/api/v1/comments/', commentRouter);
app.use('/api/v1/category/', categoryRouter);



//Error handlers middelware
//listen server
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});