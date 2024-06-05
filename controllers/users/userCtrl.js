const User = require('../../model/User/User'); 
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken');
const getTokenFromHeader = require('../../utils/getTokenFromHeaders');
const { appErr } = require('../../utils/appErr');
const storage = require('../../config/cloudinary');
const multer = require('multer');
const Post = require('../../model/Post/Post');
const Category = require('../../model/category/Category');
const Comment = require('../../model/Comment/Comment');


// register
const userRegisterCtrl = async (req, res, next) => {
    const {
        firstname,
        lastname,
        email,
        password,
        role
    } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const userFound = await User.findOne({ email });
        if (userFound) {
            return next(appErr('User already exists'));
        } else {
            // Hacher le mot de passe
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Créer un nouvel utilisateur
            const user = await User.create({
                firstname,
                lastname,
                email,
                password: hashedPassword,
                role
            });
            console.log('tout es ok');
            // retourner une reponse valide
            return res.json({
                status: 'success',
                data: user
            });
        }
    } catch (err) {
        console.log('Rien ne marche');
        // next(appErr(err.message));
        console.log(err)
    }
};

// login
const userLoginCtrl = async(req, res, next) => {
    const { email, password } = req.body;
    try{
        // check id email exist
        const userFound = await User.findOne({ email });

        if(!userFound){
            return next(appErr('Invalid login credentials', 404));
        }

        // validate password
        const isPasswordMatch = await bcrypt.compare(password, userFound.password);

        if(!isPasswordMatch){
            return next(appErr('Password do not match', 404));
        }

        res.json({
            status: 'success',
            data: {
                firstname: userFound.firstname,
                lastname: userFound.lastname,
                email: userFound.email,
                isAdmin: userFound.isAdmin,
                isBlocked: userFound.isBlocked,
                role: userFound.role,
                token: generateToken(userFound._id)
            },
        })
    } catch(err){
        next(appErr(err.message));
    }
};

// get one user(Profile)
const userProfileCtrl = async(req, res, next) => {    
    try{
        const user = await User.findById(req.userAuth);
        res.json({
            status: 'success',
            data: user
        })
    } catch(err){
        next(appErr(err.message));
        console.log(err.message);
    }
}

// get all user
const userGetAllCtrl = async(req, res) => {
    try{
        const users = await User.find();
        res.json({
            status: 'success',
            data: users
        })
    } catch(err){
        next(appErr(err.message));
    }
};

// update user
const updateUserCtrl = async (req, res, next) => {
    const { email, lastname, firstname } = req.body;
    try {
        // 1. Check if email is not taken
        if (email) {
            const emailTaken = await User.findOne({ email });
            if (emailTaken) {
                return next(appErr('Email already taken', 404));
            }
        }

        // 2. Update the user
        const user = await User.findByIdAndUpdate(
            req.userAuth,
            {
                lastname,
                firstname,
                email
            },
            {
                new: true,
                runValidators: true
            }
        );

        // 3. Send response
        res.json({
            status: 'success',
            data: user
        });
    } catch (err) {
        next(appErr(err.message));;
    }
};

// update user
const updatePassewordUserCtrl = async(req, res, next) => {
    const { password } = req.body;
    try{
        // check if user is updating the password
        if(password) {
            // hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            // update the user password
            const user = await User.findByIdAndUpdate(
                req.userAuth,
                {
                    password: hashedPassword
                },
                {
                    new: true,
                    runValidators: true
                }
            );
            res.json({
                status: 'success',
                message: 'Password change successfully'
            })
        } else {
            return next(appErr('Password is required', 404));
        }
    } catch(err){
        next(appErr(err.message));
    }
};

// Profile photo Upload
const profilePhototoUploadCtrl = async(req, res, next) => {
    // console.log(req.file);
    // 1.find the user to be updated
    const userToUpdate = await User.findById(req.userAuth);
    console.log(userToUpdate.isBlocked);
    // 2.check if user is found
    if(!userToUpdate){
        return next(appErr('User not found', 404));
    }
    // 3. check if user is blocked
    if(userToUpdate.isBlocked){
        return next(appErr('Action not allowed your account is blocked', 403));
    }
    // 4.check if a user is updating their photo
    if(req.file){
        try{
            // 5. update the user profile photo
            await User.findByIdAndUpdate(
                req.userAuth, 
                {
                    $set:{
                        profilePhoto: req.file.path
                    },
                },
                {
                    new: true,
                }
            );
            res.json({
                status: 'success',
                data: 'Profile photo uploaded successfully humm'
            })
        } catch(err){
            next(appErr(err.message, 500));
        }
    }
};

// delete user
const deleteUserAccountCtrl = async(req, res, next) => {
    try{
        //1.find the user to be deleted
        const users = await User.find();
        const userToBeDelete = await User.findById(req.userAuth);
        // 2.find all posts to be deleted
        await Post.deleteMany({ user: req.userAuth });
        // 3.delete all comments of the user
        await Comment.deleteMany({ user: req.userAuth });
        // 4. delete all category of the user
        await Category.deleteMany({ user: req.userAuth });
        // 5.delete
        await User.deleteOne({ _id: req.userAuth });
        res.json({
            status: 'success',
            message : 'User deleted successfully'
        })
    } catch(err){
        next(appErr(err.message));
    }
};

// logout
const userLogoutCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'User logout successfully'
        })
    } catch(err){
        next(appErr(err.message));
    }
}

// who view my profile
const whoViewMyProfileCtrl = async(req, res, next) => {
    try{
        // 1.find the original user
        const user = await User.findById(req.params.id);
        // 2.find the user who view the original user
        const userWhoView = await User.findById(req.userAuth);

        // 3.check if original user who view are found
        if (user && userWhoView) {
            //4. check if userWhoView is already in the viewers array
            const isUserAlreadyViewed = user.viewers.find(
                viewer => viewer.toString() === userWhoView._id.toString()
            );
            if (isUserAlreadyViewed) {
                next(appErr('User already viewed', 404));
            } else {
                // 5.push the userWhovied the users's viewers array
                user.viewers.push(userWhoView._id);
                // 6. save the user
                await user.save();
                res.json({
                    status: 'success',
                    data: 'You have successfully viewed this profile'
                });
            }
        }
    } catch(err){
        next(appErr(err.message));
    }
};

// followings users
const followingCtrl = async(req, res, next) => {
    try{
        // 1.findthe user to be followed
        const userToFollow = await User.findById(req.params.id);

        // 2.find the user who is follow
        const userWhoFollow = await User.findById(req.userAuth);

        // 3.check if userToFollow and userWhoFollow are found
        if(userToFollow && userWhoFollow){
            // 4.check if userWhoFollow is already in the following array
            const isUserAlreadyFollowing = userToFollow.following.find(
                follower => follower.toString() === userWhoFollow._id.toString()
            );
            if(isUserAlreadyFollowing){
                next(appErr('User already following', 404))
            } else {
                // 5.push the userWhoFollow to the userToFollow followers array
                userToFollow.followers.push(userWhoFollow._id);
                // 6.push the userToFollow to the userWhoFollow following array
                userWhoFollow.following.push(userToFollow._id);
                // 6.save the userToFollow
                await userWhoFollow.save();
                await userToFollow.save();
                res.json({
                    status: 'success',
                    message: 'you have successfully followed this user'
                })
            }
        }

    } catch(err){
        next(appErr(err.message));
    }
};

// Unfollow Controller
const unFollowCtrl = async(req, res, next) => {
    try{
        // 1.find the user to be unfollowed
        const userToBeUnfollow = await User.findById(req.params.id);
        // 2.find the user who is unfollowing
        const userWhoUnfollow = await User.findById(req.userAuth);
        // 3.check if userToBeUnfollow and userWhoUnfollow are found
        if(userToBeUnfollow && userWhoUnfollow){
            // 4.check if userWhoUnfollow is already in the following array
            const isUserAlreadyFollowing = userToBeUnfollow.followers.find(
                follower => follower.toString() === userWhoUnfollow._id.toString()
            );
            // 5.if user is not following
            if(!isUserAlreadyFollowing){
                return next(appErr('You are not followed this user', 404));
            } else {
                // 5.remove the userWhoUnfollow from the userToBeUnfollow followers array
                userToBeUnfollow.followers = userToBeUnfollow.followers.filter(
                    follower => follower.toString() !== userWhoUnfollow._id.toString()
                );
                // 6.save
                await userToBeUnfollow.save();
                // 7.remove the userToBeUnfollow from the userWhoUnfollow following array
                userWhoUnfollow.following = userWhoUnfollow.following.filter(
                    following => following.toString() !== userToBeUnfollow._id.toString()
                );
                // 8.save the userToBeUnfollow
                await userWhoUnfollow.save();
                res.json({
                    status: 'success',
                    message: 'You have successfully unfollowed this user'
                })
            }
        }
    } catch(err){
        next(appErr(err.message));
    }
};

// Block Controller
const blockUsersCtrl = async (req, res, next) => {
    try {
        // 1. Find the user to be blocked
        const userToBeBlocked = await User.findById(req.userAuth);

        // 2. Find the user who is blocking
        const userWhoBlock = await User.findById(req.userAuth);

        // console.log('celui qui va etre bloque', userToBeBlocked);
        // console.log('celui qui bloque:', userWhoBlock);
        // 3. Check if userToBeBlocked and userWhoBlock are found
        if (userToBeBlocked && userWhoBlock) {
            // 4. Check if userWhoBlock is already in the blocked array
            const isUserAlreadyBlocked = userWhoBlock.blocked.find(
                block => block.toString() === userToBeBlocked._id.toString()
            );

            // 5. If user is already blocked
            if (isUserAlreadyBlocked) {
                return next(appErr('You have already blocked this user'));
            } else {
                // 6. Push the userToBeBlocked to the userWhoBlock blocked array
                userWhoBlock.blocked.push(userToBeBlocked._id);

                // 7. Save
                await userWhoBlock.save();
                return res.json({
                    status: 'success',
                    message: 'You have successfully blocked this user'
                });
            }
        } else {
            return next(appErr('User not found'));
        }
    } catch (err) {
        return next(appErr(err.message));
    }
};

// unBlocked
const unBlockUserCtrl = async(req, res, next) => {
    try{
        // 1.find the user to be unblocked
        const userToBeUnblocked = await User.findById(req.userAuth);

        // 2.find the user who is unblocking
        const userWhoUnblock = await User.findById(req.userAuth);

        // 3.check if userToBeUnblocked and userWhoUnblock are found
        if (userToBeUnblocked && userWhoUnblock) {
            // 4.check if userToBeUnblocked is already in the blocked array
            const isUserAlreadyBlocked = userWhoUnblock.blocked.find(
                block => block.toString() === userToBeUnblocked._id.toString()
            );
            // 5.if user is not blocked
            if (!isUserAlreadyBlocked) {
                return next(appErr('You have not blocked this user', 404));
            } else {
                // 6.remove the userToBeUnblocked from the main user
                userWhoUnblock.blocked = userWhoUnblock.blocked.filter(
                    block => block.toString() !== userToBeUnblocked._id.toString()
                );
                // 7.save
                await userWhoUnblock.save();
                res.json({
                    status: 'success',
                    message: 'You have successfully unblocked this user'
                });
            }
        }
    } catch(err){
        next(appErr(err.message));
    }
};

// admin-block
const adminBlockUserCtrl = async(req, res, next) => {
    try{
        // 1. find the user to be blocked
        const userToBeBlocked = await User.findById(req.params.id);

        // 2. check if user is found
        if(!userToBeBlocked){
            return next(appErr('User not found', 404));
        }
        // check is isBlocked to true
        userToBeBlocked.isBlocked = true;
        // 4.save
        await userToBeBlocked.save();
        res.json({
            status: 'success',
            message: 'You are successuffly blocked this user'
        })
    } catch(err){
        next(appErr(err.message));
    }
}

// admin-unblock
const adminUnBlockUserCtrl = async(req, res, next) => {
    try{
        // 1. find the user to be unblocked
        const userToUnBeBlocked = await User.findById(req.params.id);

        // 2. check if user is found
        if(!userToUnBeBlocked){
            return next(appErr('User not found', 404));
        }
        // check is isBlocked to false
        userToUnBeBlocked.isBlocked = false;
        // 4.save
        await userToUnBeBlocked.save();
        res.json({
            status: 'success',
            message: 'You are successuffly unblocked this user'
        })
    } catch(err){
        next(appErr(err.message));
    }
}




// export
module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
    userProfileCtrl,
    userGetAllCtrl,
    deleteUserAccountCtrl,
    updateUserCtrl,
    userLogoutCtrl,
    profilePhototoUploadCtrl,
    whoViewMyProfileCtrl,
    followingCtrl,
    unFollowCtrl,
    blockUsersCtrl,
    unBlockUserCtrl,
    adminBlockUserCtrl,
    adminUnBlockUserCtrl,
    updatePassewordUserCtrl,
}