const User = require('../model/User/User');
const getTokenFromHeader = require('../utils/getTokenFromHeaders');
const verifyToken = require('../utils/verifyToken');
const { appErr } = require('../utils/appErr');

const isAdmin = async (req, res, next) => {
    // get token from header
    const token = getTokenFromHeader(req);

    //verify the token
    const decodedUser = verifyToken(token);

    //save the user data in req.user
    req.userAuth = decodedUser.id;
    console.log('isAdmin id is:', decodedUser.id)

    //find user in DB
    const user = await User.findById(decodedUser.id);
    // check if user is admin
    if(user.isAdmin) {
        return next();
    } else {
        return next(appErr('Access Denied, admin only', 403))
    };
};

module.exports = isAdmin;